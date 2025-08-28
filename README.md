# hifi_technical_em

https://thriving-ganache-38acb9.netlify.app/


Creating a fitness app to progressively overload

Exercise:
    name: str
    video: str
    category: str

Routine:
    name: str
    list[{exercise: Exercise, reps: int}]

Workout:
    name: str
    routine: Routine
    weight: int

--First View--
Header
Top shows an icon (image in a circle for the app, hard-coded)
Next to it is a picture of the user

Under the header is a list of all routines
Each routine has its name
followed by the number of exercises

Clicking a routine opens a modal where you can edit the routine you can rename
the routine

You can add/remove exercises each exercise has editable name, category, video,
and reps

There is a floating + Add Routine button to create a new routine (enter name, then edit it in the same modal)

Footer is persistent with 2 options, routines and workouts
routines should be highlighted for this view

--Second view--
accessible when you click on workouts
This will show you your workouts
Header is the same as the first view

Then each workout is listed as workout name,
underneath is routine name followed by the workout weight

Under this is a plus button. Clicking on the plus button opens a modal.
There will be the option to choose from our routines and give the workout a name.
On continue, we go to third view

Footer is the same, but workouts should be highlighted

--Third view--
Has the same header as view 1 and 2

But this time, under the header we have circles with arrows pointing to each other
that symbolize the exercises in the routine

Current exercise should be highlighted green.

Under the circles we have the embedded video for the exercise

Then we have an outlined box that shows the current weight -> weight + 5
Then under that, for the current exercise, we have rep check boxes(Rep 1, Rep 2, … up to its reps)

We have a next button underneath
if and only if all checkmarks are checked, the next button is clickable and
takes you to the next exercise in the routine

Once you get to the last exercise, it saves the workout locally (JSON) with the new name and the weight being the previous weight + 5 (based on the highest prior for that routine).
You will be taken back to the workouts view and the new workout should be there.
