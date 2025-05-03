
React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class. This guide will help you understand React Hooks in a simple and practical way with examples.

---

## What Are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features. They simplify the way you write components and make your code cleaner and more reusable.

---

## Commonly Used Hooks

### 1. `useState`
The `useState` hook lets you add state to functional components.

**Example:**
```jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

---

### 2. `useEffect`
The `useEffect` hook lets you perform side effects in your components, such as fetching data or updating the DOM.

**Example:**
```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    return <p>Timer: {seconds}s</p>;
}
```

---

### 3. `useContext`
The `useContext` hook allows you to access context values without using the `Consumer` component.

**Example:**
```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
    const theme = useContext(ThemeContext);

    return <button style={{ background: theme === 'dark' ? '#333' : '#fff' }}>Theme: {theme}</button>;
}
```

---

### 4. `useReducer`
The `useReducer` hook is an alternative to `useState` for managing complex state logic.

**Example:**
```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
}
```

---

### 5. `useRef`
The `useRef` hook lets you persist values across renders or directly access DOM elements.

**Example:**
```jsx
import React, { useRef } from 'react';

function FocusInput() {
    const inputRef = useRef();

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

---

## Best Practices for Using Hooks

1. **Only Call Hooks at the Top Level**  
     Avoid calling hooks inside loops, conditions, or nested functions.

2. **Only Call Hooks in React Functions**  
     Hooks should only be used in functional components or custom hooks.

3. **Use Custom Hooks for Reusability**  
     Extract common logic into custom hooks to keep your components clean.

**Example of a Custom Hook:**
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [url]);

    return data;
}
```

---

## Conclusion

React Hooks simplify the way we write React components by eliminating the need for classes and making code more readable and reusable. Start experimenting with hooks in your projects to unlock their full potential!

Happy coding! 🚀  