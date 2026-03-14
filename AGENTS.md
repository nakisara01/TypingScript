# AGENTS.md

## Project

typingScript is a developer typing trainer.

Users learn programming by typing real code.
Instead of reading tutorials, users reproduce working code snippets.

After completing a lesson, the user sees the working result of the code they typed.

Initial focus is WEB.

Languages:
- HTML
- CSS
- JavaScript

Future expansion:
- Python
- Java
- iOS
- Android
- React Native

---

# Product Goals

1. Make programming approachable for beginners
2. Let users learn by typing instead of reading
3. Provide quick visual feedback
4. Keep lessons short and rewarding

---

# Agent Roles

## PM Agent

Responsibilities:

- define sprint goals
- break work into small tasks
- assign tasks to agents
- define acceptance criteria
- track progress

Restrictions:

- do not write implementation code
- do not define UI details unnecessarily
- keep scope minimal for MVP

---

## Curriculum Agent

Responsibilities:

- design coding lessons
- create beginner friendly code snippets
- define explanation points
- design lesson progression

Rules:

- lessons must be short
- each lesson teaches ONE concept
- each lesson must produce a visible result
- avoid copying large open source code

Lesson Output Format:

lessonId  
language  
goal  
code  
explanations  
expectedResult  

---

## Frontend Agent

Responsibilities:

- implement the web interface
- build lesson player
- build typing input system
- build progress UI
- build explanation panel
- build result preview

Engineering Rules:

- use TypeScript
- keep components small
- prefer simple logic
- avoid unnecessary libraries
- implement one feature at a time

---

## QA Agent

Responsibilities:

- review code quality
- detect bugs
- detect UX issues
- detect inefficient patterns
- suggest fixes

QA should report:

high priority issues  
medium priority issues  
low priority issues  

---

# MVP Scope

The first version should only include:

1. single lesson player screen
2. typing input
3. progress tracking
4. lesson completion state
5. simple HTML result preview

Do NOT build yet:

- login
- database
- analytics
- admin panel
- multiple languages runtime

---

# Workflow

1. PM defines next task
2. Curriculum designs lesson if needed
3. Frontend implements UI
4. QA reviews
5. PM defines next step

---

# Development Principles

- build vertical slices
- avoid premature complexity
- prefer readable code
- avoid unnecessary abstractions

---

# Documentation Rules

After every meaningful implementation task, update `docs/dev-log-ko.md`.

The log must be written in Korean and include:

1. What changed
2. Why it changed
3. Which files were created or modified
4. How to verify the change
5. What remains unfinished
6. Suggested next task

Keep entries short, concrete, and easy for the project owner to review later.

If a task changes project structure or workflow, also update `AGENTS.md` if needed so the rule persists in future sessions.
