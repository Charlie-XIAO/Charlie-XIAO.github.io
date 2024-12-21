---
layout: page
title: VeritasTrial
description: An AI-Driven App for Clinical Trial Search and Interpretation
img: assets/img/projects/veritas-trial.png
importance: 5
category: Research and Academic
toc:
  beginning: true

shortcuts:
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/VeritasTrial/ac215_VeritasTrial
  - name: Blog
    icon: fa-solid fa-blog
    link: https://medium.com/@bowenxu_47157/veritastrial-an-ai-driven-app-for-clinical-trial-search-and-interpretation-4b9c281e3548
  - name: Video
    icon: fa-solid fa-video
    link: https://youtu.be/MO-pGNcg3QI
---

VeritasTrial is an AI-driven application for clinical trial search and interpretation, completed as part of the final project for Harvard AC215 (Fall 2024). See the links above and [our repository](https://github.com/VeritasTrial/ac215_VeritasTrial) for more details. The following only provides a brief overview. Note that this project was team effort also by Bowen Xu and Tong Xiao.

### Introduction

Clinical trial data includes structured information collected during research studies designed to evaluate the safety, efficacy, and outcomes of medical interventions, treatments, or devices on human participants. In recent years, this type of data has expanded rapidly, especially in large repositories like [ClinicalTrials.gov](https://clinicaltrials.gov/), creating immense opportunities to advance healthcare research and improve patient outcomes. However, the large volume and complexity of such data create challenges for researchers, clinicians, and patients in finding and understanding trials relevant to their specific needs.

One key limitation lies in the search functionality of platforms like [ClinicalTrials.gov](https://clinicaltrials.gov/). The current search is based on fuzzy string matching, which struggles to deliver accurate results when user queries are not precise or involve long, complex sentences. Additionally, even when users locate a specific trial, understanding its details can be challenging due to the technical language and dense structure of the information.

**Solution:** To overcome these challenges, we aim to develop an AI-powered application that improves the information retrieval process for clinical trials. By leveraging state-of-the-art embedding models, our system will retrieve the most relevant trials from [ClinicalTrials.gov](https://clinicaltrials.gov/) based on user queries, even if those queries are less structured or precise. After retrieval, an intuitive conversational AI chatbot will enable users to explore specific details of a trial, such as endpoints, results, and eligibility criteria. Our app can benefit a lot of different user groups. For clinical trial researchers, they can find trials to their needs more accurately and interpret the result more efficiently. For patients, it might help them identify target recruiting clinical trials that they can participate in. This interactive approach streamlines access to critical information, empowering users to make more informed decisions in clinical research and patient care.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/veritas-trial/architecture.png"
      class="img-fluid rounded z-depth-1"
      caption="The overall architecuture of VeritasTrial."
      zoomable=true
    %}
  </div>
</div>

### Backend Service

Our backend is built with FastAPI in Python. As follows are the API specifications:

- `/heartbeat`: A `GET` endpoint that checks server health by returning the current timestamp in nanoseconds.
- `/retrieve`: A `GET` endpoint that retrieves clinical trials based on user queries, specified filters (e.g., study type, age range, date range), and the desired number of results (Top K).
- `/meta/{item_id}`: A `GET` endpoint that retrieves metadata for a specific trial using its unique ID.
- `/chat/{model}/{item_id}`: A `POST` endpoint that enables interaction with a generative AI model about a specific trial. Users can ask questions (e.g., trial outcomes, sponsors), and the system provides context-aware answers.

### Frontend Interface

Our frontend is build with React and TypeScript with the Vite framework. It consists on a retrieval panel and multiple chat sessions. The retrieval panel can retrieve clinical trials that match the given queries. The user can then select the trials to chat on, each creating a unique chat session.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/veritas-trial/retrieval-panel.png"
      class="img-fluid rounded z-depth-1"
      caption="The retrieval panel."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/veritas-trial/chat-session.png"
      class="img-fluid rounded z-depth-1"
      caption="The chat session."
      zoomable=true
    %}
  </div>
</div>
