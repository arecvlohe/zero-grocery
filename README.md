# Adam's Grocery Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary

This project took me about 10-12 hours. I used some tools I was familiar with such as redux and tailwindcss as well some that are not like [redux-observable](https://redux-observable.js.org/). I enjoyed working on this project and learning a few things while I did.

## Run Project

To run the project, first install, then build it, then use [serve](https://www.npmjs.com/package/serve) to run it locally and on your network.

```sh
yarn install

yarn build

serve -s build
```

## Run Tests

To run tests, simply invoke the test script.

```sh
yarn test
```

## Design Decisions

### Middleware

In the past, I've worked with both redux-thunk and redux-saga. Thunks don't compose as nicely as observables, while also not having as many utilities, and sagas don't type very well at times, although casting helps. I hadn't tried it out in the past, but was curious about the potential for using redux-observable. The trade-off to using redux-observable is a steep learning curve in trying to understand observables and all that rxjs comes with, but I think it's worth it. I didn't have much trouble with this simple use case but I am interested to learn about the various utilities around observables.

### TypeScript

TypeScript allows `any` which defeats the purpose of having types, in my opinion, but I understand it's because it's a layer on top of JavaScript. I do my best to prevent explicit, as well as implicit, `any` from finding its way into the codebase.

### Testing

I did some simple unit testing of functions and of reducers. If I was to spend more time on this I would have looked at adding [cypress.io](https://www.cypress.io/) and done some integration testing.

### Styling

I like styling but I have not delved deep into how to create a design system in the way [taildwindcss.com](https://tailwindcss.com/) has done. I leverage their system, making use of sensible design defaults such as padding and margin, to create a decent looking application.

### Database

I went with a postgres DAAS called [supabase.io](https://supabase.io/) to host my data.

### Folder Structure

I keep the folder structure flat, simple, and easy to search. It's easy to create folders and endlessly nest which over time gets unwieldy I think.

### Git History

I created branches for almost all the features but would just merge the commits back into the `latest` branch, my main branch, without squashing so you can see the full history.

## Future Enhancements

- Test redux-observable epics
- Test selectors
- Integration tests using Cypress.io
- Improve types
- View individual grocery items
- Remove grocery items from shopping cart
- Update grocery items in shopping cart
