---
title: "Integrating AI into Web Apps: Practical Document-Based Chat (RAG) Patterns"
date: "2026-04-16"
description: "A practical guide to building accurate AI chat with RAG: ingestion, chunking, indexing, retrieval, guardrails, quality evaluation, caching, and monitoring."
---

# Integrating AI into Web Apps: Practical Document-Based Chat (RAG) Patterns

If you have ever built a document-based AI chat, you probably experienced this:

- the question sounds “right”,
- the AI responds quickly,
- but the answer is not aligned with the document context,
- or it even invents details.

The issue is usually not the LLM itself. The issue is the pipeline: how documents are processed, indexed, retrieved, and then combined with the prompt.

In this article, I will walk through a practical RAG (Retrieval Augmented Generation) pattern for integrating AI into web applications, from MVP to production.

## What is RAG, and when do you need it?

RAG is an architecture pattern where the LLM’s answer is “helped” by relevant documents.

Common use cases that fit RAG:

- customer support powered by a knowledge base
- an internal chatbot for SOPs and guidelines
- summarizing project documents (proposals, contracts, specs)
- an HR assistant that answers questions from job descriptions

RAG is a good fit when:

- you have documents you want to treat as the source of truth,
- answers must be relevant to specific content,
- and you do not want to retrain a model every time documents change.

If your data is small and questions are simple, prompt-only solutions can sometimes be enough.

## Practical end-to-end RAG architecture

At a high level, a RAG pipeline has 5 blocks:

1. Ingestion (collect document sources)
2. Cleaning & chunking (clean text, split into segments)
3. Indexing (create embeddings and store them in a vector store)
4. Retrieval (fetch the most relevant segments for the query)
5. Generation (send the retrieved context into the prompt and generate the answer)

It sounds simple, but the parts that fail most often are ingestion, chunking, and retrieval.

## Ingestion: pick the right sources first

Ingestion is not just “import files”.

You need to decide:

- where are the sources coming from? (PDF, Notion, website, Google Drive, CMS)
- how do documents update? (full reindex or incremental)
- how do you handle duplicates and different versions?

Common mistakes:

- indexing noise like headers/footers and long boilerplate
- old document versions still showing up in retrieval
- permission problems (the system should not read restricted data)

Practical steps:

- create a list of sources and update rules,
- use a whitelist for document types,
- and store document metadata (for example `source`, `updatedAt`, `language`, `tags`).

## Chunking: avoid chunks that are too big or too small

Chunking splits a document into segments that can be retrieved.

If chunks are too small:

- context is lost,
- retrieval may return correct sentences but incomplete answers.

If chunks are too large:

- the model receives too much text,
- relevance gets diluted,
- and token cost increases.

Practical approach I often use:

- 200-500 words per chunk for narrative content
- chunk by section for structured documents (titles, headings)
- keep structural info (for example section name) to improve retrieval accuracy

If your documents include tables or lists, consider chunking based on headings or markers so the generated answers stay clean.

## Embeddings and vector store: store with useful metadata

After you create chunks, you need embeddings and a vector store.

One key detail people often forget:

- metadata is essential for filtering (for example language, team, date)
- you need an update strategy when documents change

I usually store at least:

- `docId`
- `source`
- `language`
- `sectionTitle`
- `updatedAt`

With metadata, retrieval becomes more precise (for example only search inside `en` documents).

## Retrieval: fetch relevant context, not just “similar” text

Retrieval typically returns top-k chunks based on embedding similarity.

But there are challenges:

1. embedding similarity does not always mean correct answers
2. retrieved chunks can overlap and duplicate each other
3. the truly correct chunk might be top-3 or top-5, not top-1

The pattern I recommend:

- retrieve a larger top-k first (for example top-5 or top-10)
- deduplicate overlapping chunks
- optionally apply re-ranking with a smaller model or heuristics

If you can, re-ranking often improves quality significantly.

## Generation: prompt the model to use the context

Generation is not only about pasting documents into a prompt.

I usually structure it like:

1. model role (assistant)
2. instruction to answer only from the provided context
3. a rule for “if not found, say you cannot find it”
4. a clear answer format

Example prompt structure (short):

```text
You are a document-based assistant.
Use only the provided context snippets.
If the answer is not supported by the snippets, say you cannot find it.
Return the answer in a short, structured format.
Include 1-2 citations referencing snippet IDs.
```

With these rules, you reduce hallucinations and improve faithfulness (answers grounded in sources).

## Guardrails: control risks before the user sees results

Guardrails matter a lot in real web apps.

Some guardrails I use:

- redaction: remove PII (emails, phone numbers, sensitive data) before indexing or generation
- rate limiting and abuse prevention (avoid prompt injection attacks)
- do not produce outputs not supported by context: “not found in documents”
- limit output length to keep UX good

If you index internal documents, permission filtering is also mandatory.

## Quality evaluation: measure what matters

RAG evaluation usually has two layers:

1. retrieval quality
2. final answer quality (faithfulness + usefulness)

For retrieval, simple metrics work well:

- hit rate: does the correct chunk appear in the top-k?
- retrieval coverage: can answers be supported by retrieved context often enough?

For final answers:

- faithfulness: does the answer match the context?
- helpfulness: does it solve the user’s problem?

Start with manual sampling:

- take 20-50 real questions
- label results (correct/incorrect or relevant/not relevant)
- look for patterns (chunking, retrieval filters, or prompt issues)

## Caching and latency: make the chat feel fast

RAG can be slow due to retrieval and generation.

Optimizations with the biggest impact:

- cache retrieval for frequently asked questions
- cache generation for the same context with a TTL
- batch re-ranking when possible

Also keep UX responsive: show a “thinking” state and skeleton UI.

## MVP vs production: a realistic rollout plan

An MVP I recommend:

- 1 clear document source (SOP or FAQ)
- 1 chunking strategy (heading-based)
- 1 vector store
- retrieval top-k + a strict prompt (“answer only from context”)
- manual evaluation with sampling

After MVP is stable, improve:

- incremental ingestion
- re-ranking
- monitoring quality + feedback loop

## Closing

RAG is not just “chat with documents”.

The real win comes from an end-to-end pattern:

- clean ingestion,
- correct chunking,
- solid retrieval,
- strict prompting,
- guardrails that protect users,
- and consistent quality evaluation.

If you want, I can help you design a RAG blueprint for your application. Start with a quick conversation: [Ayo diskusi](/about).

