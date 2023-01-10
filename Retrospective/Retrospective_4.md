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
- Total points committed vs. done : (21, 21)
- Nr of hours planned vs. spent (as a team) : (73h 30m, 74h 55m)

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics
0) Add images for hikes and huts.
   Technical debt management.
   Fix selector map.
   Fix buttons for preferences.
   Fix unit of measures in forms.
   Fix tests.
17)  Start hike As a hiker I want to start a registered hike So that I can record an ongoing hike. (Story 17)
18)  Terminate hike As a hiker I want to terminate a hike So that the hike is added to my completed hikes. (Story 18)
34)  Completed hikes As hiker I want to access the list of hikes I completed. (Story 34)
19)  Record point As a hiker I want to record reaching a reference point of an on-going hike So that I can track my progress on the hike. (Story 19)


| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| 0     | 30      | -      | 28h        | 28h 55m      |
| 17    | 11      | 8      | 14h        | 14h 20m      |
| 18    | 7       | 5      | 10h 30m    | 10h 40m      |
| 34    | 6       | 3      | 8h         | 8h 15m       |
| 19    | 11      | 5      | 13h        | 12h 45m      |


- Hours per task average, standard deviation (estimate and actual)
  - Estimated task average: (73h 30m/64) = 1h 9m (we estimated only 64 tasks but we added 1 task after with estimation 0)
  - Actual task average: (74h 55m/65) = 1h 9m
  - Estimated standard deviation: 0.67
  - Actual standard deviation: 0.675
  
  <br>
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1: 0.982 - 1 = -0.018

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 5h 30m
  - Total hours spent: 5h 50m
  - Nr of automated unit test cases: (3 new, 30 total + improve old ones)
  - Coverage: around 96% (Visual Studio Code), around 93% (SonarCloud)
- E2E testing:
  - Total hours estimated: 19h 
  - Total hours spent: 19h (new tests + update old ones)
- Code review 
  - Total hours estimated: 2h
  - Total hours spent: 2h
- Technical Debt management:
  - Total hours estimated: 7h
  - Total hours spent: 7h 40m
  - Hours estimated for remediation by SonarQube: 10h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 5h (including false positive) 
  - Hours spent on remediation: 5h 40m + removed false positive which increased estimated.
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.1%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability): reliability: A, security: A, mantainability: A, coverage: 92.8%, duplications: 1.5%
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We sligthly misinterpreted story 17, after a discussion with the product owner we lost some time to fix what we had already done.
  We forgot to add in the planning one task that we added after.
  <br>

- What lessons did you learn (both positive and negative) in this sprint?
  
  - We need to improve communication with the product owner to always be sure that our interpretation is correct.
  <br>

- Which improvement goals set in the previous retrospective were you able to achieve?
  
  - We reduced duplicated code in the frontend and some code smells.
  - We fixed the issues accorded during the demo.
  <br>

- Which ones you were not able to achieve? Why?
  <br>

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  
  - We want to try to work faster to try to deliver more stories to the client.
  - We need to try to all be more involved in all phases of the project and specialize less on something so that we have a 360-degree view of the work and so that we are not harmed if we are absent. We can achieve this by trying to divide tasks differently.
  <br>

- One thing you are proud of as a Team!!
  
  - We are satisfied with our work, we were very good at solving a snag, and we are happy with SonarCloud statistics. :)
