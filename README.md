# Work Management Dashboard Technical Assessment Luca

## Tech stack

- React — component-based UI
- JavaScript — i chose this for speed of delivery
- CSS — plain CSS per component
- Create React App — project setup

## Components

### DataGrid component

- Client side pagination ( for 10, 25, 50 rows per page )
- Sorting on any column by filter
- Clear filters button
- Hide show column with dropdown
- Counter for rows
- Empty rows

### Timeline

- Items ( events ) grouped by week - why? - i chose this over day for better readability with over 300+ records
- Current week highlighted 
- Date range for filtering ( From - To )
- Screen reader announcements via aria-live

### Form

- All fields required with validation messages
- Focuses first invalud field
- Success message on save
- Cancel / Save flow
- Clicking outside the popup closes modal

## Architecture 

- **State management**: React useState only ( i didnt implement Redux or Context because its not needed for this scale of 300 ). The state lives in App.js and is passed as props.
- **Grouping by weeks**: With 300 tasks, the day grouping will create a lot of small columns so i decided for better visibility to have it per week
- **Mock data**: 300 generated tasks on app load with random attributes
- **Component structure**: Each component has its own folder with a css file attached to it

## How to run 

``` bash 
npm install
npm start
```