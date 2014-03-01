
# Artery

[![Build Status](https://travis-ci.org/bredele/artery.png?branch=master)](https://travis-ci.org/bredele/artery)  [![Selenium Test Status](https://saucelabs.com/buildstatus/bredele)](https://saucelabs.com/u/bredele)
  > the internal plumbing of your web application

Artery aims to provide a clean and yet powerful event-driven architecture to create scalable and maintainable applications. Artery's API is greatly inspired by [express](http://github.com/visionmedia/express) and its secret goal is to get the same kind of code on both client and server side.

Artery works on top of your favorite framework and has first-class support for [components](http://github.com/component) (commonjs) but works fine as a standalone/AMD version.


## Overview

You've probably met that guy at work who was always getting on your nerves (to be polite) and constantly told you to not repeat yourself, avoid tight coupling or think reusable and maintainable as much as possible. This guy (may be you) is a pain but you've also spend a lot of time refactoring your application and you start thinking he is right.

  > This guy's name is Addy Osmani or Nicholas Zakas and he wrote interesting articles such as [scalable javascript architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture-2012) or [large scale javascript](http://addyosmani.com/largescalejavascript/).

His motive was to avoid end up doing the same stuff all over again. He wanted an application that **keeps working and doesn't break** no matter what. That's what Artery is about.
<!---
  > **Don't be a fool!** There is great tools out there such as Backbone, Angular or Ember, but none of them give a structure to your web application. Because doing a scalable application is way more complicated than doing a todo list, you should have a framerwork that helps to architecture your app.
-->
### Structure

Artery reduces the complexity of your webapp by splitting it into small modules (or apps). Each piece live by its own, is totally independant from an other and communicate with it through an event hub. **Removing a piece doesn't break the others** (same for errors).

#### Features:
  - Loose coupling of modules
  - Complete [event bus]()
  - Modules have [lifecycle hooks]()
  - Modules can be extend
  - Supports CommonJS and AMD

With Artery, a module can be dom related or a simple piece of logic, HTML or CSS. In the future, it would be easy to import [web components](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/).

### Maintainability

Artery isn't tight coupled to libraries. You can decide to switch from using jQuery to Zepto, Backbone to Angular or something entirely different. Artery is extensible and its flexibility will save you some precious time.

#### Features:
  - Library and framework agnostic
  - Modules are [fully configurable]()
  - Abstract utils libraries.
  - Manage your apps dependencies
  - Modules can be tested individualy.
  - IE support (under IE7+) 

Artery behaves as a valve, it's just the entry point of your modules. It has been made to be as simple as possible and isn't invasive. **Write the JavaScript you like** and most important, a code that your team mates can understand.  

### Reusability

Artery makes easy to reuse small modules or apps like express do with middlewares.

 > Think of the chat module in Gmail. That's the same that you have in Google docs or Google+. Doing 3 times the same module would be a waste of time and money! Now, using Artery you would code the module once and use it in 3 differents apps (probably what's google is doing).

#### Features:
  - [Middleware engine](https://github.com/bredele/artery/tree/master#compose-your-web-application)
  - Tools for scaffold and export your modules
  - Use Github as repository for your modules


In one line of code, you can authenticate your app, connect to external services like Facebook or Twitter, store your module data and way more.


## Getting started

### Installation

Artery has first-class support for [component](http://github.com/component) and will support soon other package manager tools such as browserify or bower.

component:

    $ component install bredele/artery

standalone:

    <script src="artery.js"></script>
 
### Create an `app`

An app is the artery of your web application. It's the interface that will help you to divide everything up into smaller parts with lower complexity and responsability.

```js
var app = module.exports = require('artery')();
```

  > In the example above, the app is exported (`module.exports`) and so, can be instantiated multiple times and reuse in an other project.

It is through the `app` that you will emit and receive messages (the blood...berk!) and allow each part to communicate without creating dependencies between them.

### Compose your web application

With express, you can **use** other express apps and provide a clean and nice separation of concerns and functionnalities. Artery does the same:

```js
//mails behaves as an event hub
var mails = module.exports = require('artery')();

//chat and messages are both artery apps
mails.use('chat', require('chat'));
mails.use('messages', require('messages'));

```

In the example above, `mails` initialize `chat` and `messages`. Both have a namespace and can now communicate each other (see below).

  > It is a good pratice to instantiate an app into a new file to make things more maintainable and readable.

`use` can also be used to [extend](https://github.com/bredele/artery/tree/master#extend-an-app) an `app`.

### Make your `app` communicate

An `app` can trigger (`emit`) and receive (`on`) messages through an event broadcasting mechanism.

messages.js:

```js
var messages = module.exports = require('artery')();

messages.emit("new", "don't forget to do the dishes");

```


chat.js:

```js
var chat = module.exports = require('artery')();

chat.on('messages/new', function(msg) {
  console.log(mgg);
  //don't forget to do the dishes
});
```
Here's an [architectural example](https://github.com/bredele/artery/tree/master/examples/architecture) that worth a thousand words.


### Lifecycle hooks

We have seen that an `app` can communicate at an application-level but it support also module-level communication (sandboxed events).
A sandboxed event will stay inside the `app`.

```js
var chat = module.exports = require('artery')();

chat.sandbox.emit('ready');

chat.sandbox.on('ready', function(){});

```
In this example, `messages` won't be able to catch the `ready` event trigerred by `chat`.

Some sandboxed events are trigerred automatically:
  - `init` (when an app is `used` by an other one)
  - `stop` (froze a module)
  - `destroy` (destroy a module)

This events are hooks and don't do anything. For example, you could use `destroy` to destroy the views from your app.

 > In a next release, Artery will probably able to handle asynchronous applications through a `ready` event.

### Configure an `app`

We never talk about how important it is to configure your application. Especially when you want to reuse it somewhere. 


```js
var chat = module.exports = require('artery')();

chat.config({
	name: 'bredele',
	group: 'github'
});

```

Artery's configuration is dynamic and use the `app sandbox` to notify of a change in the config.

```js
chat.sandbox.on('change name', function(val){
	console.log(val);
	//olivier
});

chat.config('name', 'olivier');

```

### Extend an `app`

An `app` can be extended through the middleware engine:

```js
chat.use(function(app) {
  app.save = function() {
     //do something
  };
});
```
You can also globally extend the api of `app` as following:

```js
var artery = require('artery');
artery.merge(require('superagent'));
```
see [example](https://github.com/bredele/artery/tree/master/examples/merge).

## License

  MIT
