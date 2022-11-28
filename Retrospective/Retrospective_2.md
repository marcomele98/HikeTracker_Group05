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
- Total points committed vs. done : (14, 14)
- Nr of hours planned vs. spent (as a team) : (72h 30m , 73h 15m)

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics
0) Show the point that I select as reference points when I insert a new hike.
   Email verification
   Collect data for hikes for different regions
   Update database tables and correct previous insertion
   Add filter for radius from a point to story 1
   Adjust filters for length, ascent and time
   Automatic insertion of fields for new hike
   Update input ref point map
   Update story 1 and 2
   Update tests of previous stories
   Docker
   Srum meetings
5) Describe hut - As a local guide I want to insert a hut description
6) Describe parking As a local guide I want to add a parking lot
7) Search hut As a hiker I want to search for hut description
8) Link start/arrival As a local guide I want to add parking lots and huts as start/arrivals points for hikes



| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| 0      | 22      |  -     |  22h 30m   |  27h         |
| 5      | 11      |  3     |  18h       |  15h 10m     |
| 2      | 9       |  3     |  14h       |  12h 45m     |
| 3      | 4       |  3     |  5h        |  3h 10m      |
| 4      | 7       |  5     |  13h       |  15h 10m     |


- Hours per task average, standard deviation (estimate and actual)
  - Estimated task average: (72h 30m/51) = 1h 25m 
  - Actual task average: (73h 15m/53) = 1h 23m
  - Estimated standard deviation: 0.766
  - Actual standard deviation: 0.899
  
  <br>
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1: (0,99 - 1) = -0.01

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 8h
  - Total hours spent: 8h
  - Nr of automated unit test cases: 12 new (23 total)
  - Coverage: around 97%
- E2E testing:
  - Total hours estimated: 16h 
  - Total hours spent: 15h 30m
- Code review 
  - Total hours estimated: 2h
  - Total hours spent: 1h 40m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

  We overestimated some tasks and accordingly with the remaining time we added 2 tasks.
  When we do the estimation of some tasks we don't consider that sometimes we alredy have a part of code that we can reuse.
  <br>
- What lessons did you learn (both positive and negative) in this sprint?
  
  We learn that is important to put under consideration the previous story and tasks in order to know when we can reuse some code and do a more accurate estimation.

  <br>

- Which improvement goals set in the previous retrospective were you able to achieve?
  
  We understood good the stories before starting the sprint planning.
  We divided the stories into shorter tasks and made more accurate estimation.
  We defined internal delivery dates in order to have a better organization of the work.
  We communicate better in this sprint and in fact all the work is finished on time and not on the last day.
  <br>

- Which ones you were not able to achieve? Why?
  <br>

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  
  Improve the graphical user interface.
  Reduce the technical debt, duplicated code and code smells.
  Better divide the tasks to assign us the tasks that we like and that are easier for us.
  Try to automate the calculation of group work statistics.
  <br>
- One thing you are proud of as a Team!!

  Everyone gave 100% of himself/herself to the team and we improved as singles and as a team during this sprint.
  Each of us is always ready to help the other members.
  We finished the work not the last day so we are free on sunday. :)