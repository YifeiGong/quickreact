import React, { useState, useEffect} from 'react';
import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { timeParts, hasConflict } from './times'

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAXrUYTbJl8n7hQdKEG-0PBM_LWfhO7tXM",
  authDomain: "scheduler497.firebaseapp.com",
  databaseURL: "https://scheduler497.firebaseio.com",
  projectId: "scheduler497",
  storageBucket: "",
  messagingSenderId: "673409258148",
  appId: "1:673409258148:web:9cfe4a9d554de3389d8c31",
  measurementId: "G-LLGQ2SML28"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};


const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};
  
const Course = ({ course, state, user }) => (
    <Button color={ buttonColor(state.selected.includes(course)) }
      onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
)


const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [ selected, toggle ];
};

const buttonColor = selected => (
  selected ? 'success' : null
)

const TermSelector = ({ state }) => (
  <Button.Group hasAddons>
    { Object.values(terms)
        .map(value => 
          <Button key={value}
            color={ buttonColor(value === state.term) }
            onClick={ () => state.setTerm(value) }
            >
            { value }
          </Button>
        )
    }
  </Button.Group>
);

export { useSelection, getCourseTerm, TermSelector, Course }
