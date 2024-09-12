import React from 'react'; // import dependencies
import { render, screen } from '@testing-library/react'; // import react-testing methods
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import '@testing-library/jest-dom'; // add custom jest matchers from jest-dom

import CourseCard from '../../Courses/components/CourseCard/CourseCard'; // the component to test

// When the test ends, we want to 'clean up' and unmount the tree from the document
import { unmountComponentAtNode } from 'react-dom';
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('CourseCard', () => {
  const mockedState = {
    user: {
      isAuth: true,
      name: 'Test Name',
    },
    courses: [],
    authors: [],
  };

  const mockedStore = {
    getState: () => mockedState,
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };

  it('CourseCard should display title', () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <CourseCard title='title' creationDate='7/12/2022' />, container
        </Provider>
      </BrowserRouter>
    );
    // screen.getByRole(''); // debug what's visible and define available roles

    // ACT
    let title = screen.getByRole('heading', { name: 'title' });

    // ASSERT
    expect(title).toBeTruthy();
  });

  it('CourseCard should display description', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <CourseCard
            title='title'
            creationDate='7/12/2022'
            description='thisIsDetailedDescriptionOfTheCourse'
          />
          , container
        </Provider>
      </BrowserRouter>
    );

    let description = screen.getByText(/thisIsDetailedDescriptionOfTheCourse/i);

    expect(description).toBeInTheDocument();
  });

  it('CourseCard should display duration in the correct format', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={mockedStore}>
            <CourseCard
              title='title'
              creationDate='7.12.2022'
              duration={1234}
            />
            , container
          </Provider>
        </BrowserRouter>
      );
    });

    expect(screen.queryByText('20:34 hours')).toBeInTheDocument();
    expect(screen.queryByText('1234 hours')).not.toBeInTheDocument();
  });

  it('CourseCard should display authors list', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={mockedStore}>
            <CourseCard
              title='title'
              creationDate='7/12/2022'
              authors={[
                '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
                '1c972c52-3198-4098-b6f7-799b45903199',
              ]}
            />
            , container
          </Provider>
        </BrowserRouter>
      );
    });

    expect(screen.queryAllByText(['author', 'author2'])).toBeTruthy();
  });

  it('CourseCard should display created date in the correct format', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={mockedStore}>
            <CourseCard title='title' creationDate='7/12/2022' />, container
          </Provider>
        </BrowserRouter>
      );
    });

    expect(screen.getByText('7.12.2022')).toBeInTheDocument();
    expect(screen.queryByText('7/12/2022')).not.toBeInTheDocument();
  });
});
