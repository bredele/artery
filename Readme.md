
# Artery

  > the internal plumbing of your web application

Artery aims to provide a clean and yet powerful event-driven architecture to create scalable and maintainable applications. Artery's API is greatly inspired by [express](http://github.com/visionmedia/express) and its secret goal is to get the same kind of code on both client and server side.

Artery works on top of your favorite framework and has first-class support for [components](http://github.com/component) (commonjs) but works fine as a standalone/AMD version.


## Overview

You've probably met that guy at work who was always getting on your nerves (to be polite) and constantly told you to not repeat yourself, avoid tight coupling or think reusable and maintainable as much as possible. This guy (may be you) is a pain but you've also spend a lot of time refactoring your application and you start thinking he is right.

  > This guy's name is Addy Osmani or Nicholas Zakas and he wrote interesting articles such as [scalable javascript architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture-2012) or [large scale javascript](http://addyosmani.com/largescalejavascript/).

His motive was to avoid end up doing the same stuff all over again. He wanted an application that **keeps working and doesn't break** no matter what. That's what Artery is about.

### Structure

Artery reduces the complexity of your webapp by splitting it into small modules (or apps). Each piece live by its own, is totally independant from an other and communicate with it through an event hub. **Removing a piece doesn't break the others** (same for errors).

#### Features:
  - Loose coupling of modules
  - Complete event bus
  - Modules have lifecycle hooks
  - Modules can be extend
  - Supports CommonJS and AMD

With Artery, a module can be dom related or a simple piece of logic, HTML or CSS. In the future, it would be easy to import [web components](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/).

### Maintainability

Artery isn't tight coupled to libraries. You can decide to switch from using jQuery to Zepto, Backbone to Angular or something entirely different. Artery is extensible and its flexibility will save you some precious time.

#### Features:
  - No dependencies (library and framework agnostic)
  - Modules are fully configurable
  - Abstract utils libraries.
  - Modules can be tested individualy.
  - IE support (under IE7+) 

Artery behaves as a valve, it's just the entry point of your modules. It has been made to be as simple as possible and isn't invasive. **Write the JavaScript you like** and most important, a code that your team mates can understand.  

### Reusability

Artery makes easy to reuse small modules or apps like express do with middlewares.

 > Think of the chat app in Gmail. 




**Don't be a fool!** There is great tools out there such as Backbone, Angular or Ember, but none of them give a structure to your web application. Because doing a scalable application is way more complicated than doing a todo list, you should take the time to architecture it.

## Installation


Artery has first-class support for [component](http://github.com/component) and support other package manager tools such as browserify or bower.

component:

    $ component install bredele/artery

browerify;

    $ npm install artery

standalone:

    <script src="artery.js"></script>


 > As a team, writing a maintainable code doesn't mean writing the best code ever. 


## License

  MIT
