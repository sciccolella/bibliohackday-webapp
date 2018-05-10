Instruction
==============

Install it
--------
Clone folder and then run:

```shell
npm install
```

Start
--------
In folder run
```
npm run devstart
```

Use it
--------
Open browser to:
```
http://localhost:3000/login
```

Useful links/info
------------------
- Engine: `Node.js`
- Webapp Engine library: `Express JS`
- Interface render: `Pug (previously called Jade)`. Pug is a different way (similar to python) to encode HTML pages.
- HTML to Pug converter: `http://html2jade.org/`
- Componets of each HTML page are written usign `Bootstrap`
- Library to run external HTTP requests (to the BookServer): `request`
- Lots of Bootstrap examples: `https://getbootstrap.com/docs/3.3/components/`. Just convert them to pug using the previous link. **Be careful about indentation!**

Other info
---------------
- The web app works like a REST API. So you could possibly have GET and SET to each page.
- When a page is loadeded it goes inside it's own **render**. (e.g. inside `routes/*.js`). Each page has its own render/router.
- You move between pages using `app.render()` or `app.redirect`
- Calls to the BookServer API are done with `request` and are external. They should be inside a call to the webapp. Examples are `PUSH '/login'` and `PUSH '/signup'`
- This webapp **does not** `bookapi.js`, but instead it communicates with the API on the server directly. This will make developing a lot easier and faster.
- Some calls can be inside a render/router, like for `routes/profile.js`. This should be self explanatory.
- The **Pug** engine allows for 1) declarations of variables 2) access to headers passed from the render 3) conditional statements 4) Iterations. Examples of 1), 2) and 3) can be found in `/views/profile.pug` and its render in `/routes/profile.js`. No examples for 4) but should be easy to do, a link to the docs here: `https://pugjs.org/language/iteration.html`
- Most of the skeleton of the app is already set up. We need a view for 1) selected shelf, 2) selected book
- We need a QR code generator. This should be easily added, just google `express qrcode generator` and see what happens.
- Have fun!