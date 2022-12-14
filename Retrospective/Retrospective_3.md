TEMPLATE FOR RETROSPECTIVE (Team 5)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done : (4, 4)
- Total points committed vs. done : (16, 16)
- Nr of hours planned vs. spent (as a team) : (72h, 72h 25m)

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics
0) Graphical interface improvement.
   Technical debt management.
   Fixing point of existing hikes.
   Data for region city and province consistent.
   Fixing tests.
9) Link hut - As a local guide I want to link a hut to a hike So that hikers can better plan their hike.
33) Define reference points - As a local guide I want to define reference points for a hike I added So that hikers can be tracked.
10) Set profile - As a hiker I want to record my performance parameters So that I can get personalised recommendations.
11) Filter hikes - As a hiker I want to filter the list of hikes based on my profile So that I can see them based on certain characteristics.



| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| 0      | 34      |  -     |  33h 30m   |  36h 15m     |
| 9      | 6       |  5     |  8h        |  7h 20m      |
| 33     | 6       |  3     |  8h        |  8h          |
| 10     | 8       |  5     |  12h       |  11h 20m     |
| 11     | 7       |  3     |  10h 30m   |  9h 30m      |


- Hours per task average, standard deviation (estimate and actual)
  - Estimated task average: (72h/59) = 1h 13m (we estimated only 59 tasks but we added 2 tasks after with estimation 0)
  - Actual task average: (72h 25m/61) = 1h 11m
  - Estimated standard deviation: 0.608
  - Actual standard deviation: 0.569
  
  <br>
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1: 0.99 - 1 = -0.01

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 5h 30m
  - Total hours spent: 5h 45m
  - Nr of automated unit test cases: (4 new, 27 total + improve old ones according to the db changes and to remove duplication)
  - Coverage: around 95% (Visual Studio Code), around 92% (SonarCloud)
- E2E testing:
  - Total hours estimated: 21h 
  - Total hours spent: 21h (new tests + update old ones according to the db changes and to rempove duplication)
- Code review 
  - Total hours estimated: 2h
  - Total hours spent: 2h
- Technical Debt management:
  - Total hours estimated: 11h 30m
  - Total hours spent: 11h
  - Hours estimated for remediation by SonarQube: 26h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 19h (including 6h of false positive) 
  - Hours spent on remediation: 9h + removed false positive which increased estimated.
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.3%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability): reliability: A, security: A, mantainability: A, coverage: 91.8%, duplications: 3.7%
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

  We overestimated some tasks and underestimated others and accordingly with the remaining time we added 2 tasks (filter persistent and update some tests).
  The errors were not very significant, the maximum maybe is half an hour, so maybe we can't really talk about errors in estimation.
  We forgot to add in the planning the two tasks that we added after.
  <br>
- What lessons did you learn (both positive and negative) in this sprint?
  
  We have learned that where possible the technical debt must be managed hand in hand with the new additions because for example having a lot of duplicate code if we have to change something in that code we have to change it from several parts

  <br>

- Which improvement goals set in the previous retrospective were you able to achieve?
  
   - We improved the graphical user interface.
  
   - We reduced thecnical debt, Our strategy was the following:
      We have divided the problems into two categories, false positives and those to be solved.
      False positives were excluded from the analysis so that we could better focus on those to be resolved. Of the latter, the known and quickest to correct according to our estimates have actually been resolved. We have significantly reduced code smells and code duplication.

    - We have divided the tasks to assign each of us the tasks we do best
    - We automated the calculation of the statistics as the standard deviations, the total of hours etc.
  <br>

- Which ones you were not able to achieve? Why?
  <br>

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  
  - Reduce duplicated code in the frontend and other code smells reserving some time to it during the planning.
  - Resolve the issues accorded during the demo.
  <br>
- One thing you are proud of as a Team!!
  We managed to further improve the quality of the work compared to previous sprints and we were free on Sunday again this time. :)
