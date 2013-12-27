
# Artery

  > the internal plumbing of your web application

Artery aims to provide a clean and yet powerful event-driven architecture to create scalable and maintainable applications. Artery's API is greatly inspired by [express](http://github.com/visionmedia/express) and its secret goal is to get the same kind of code on both client and server side.

Artery works on top of your favorite framework and has first-class support for [components](http://github.com/component) (commonjs) but works fine as a standalone/AMD version.


## Overview

You've probably met this guy at work that got on your nerves (to stay polite) and constantly told you to not repeat yourself, avoid tight coupling or think reusable and maintainable as much as possible. This guy (may be you) is a pain but you've also spend a lot of time refactoring your application and you start thinking he is right.

  > This guy's name is Addy Osmani or Nicholas Zakas and wrote interesting articles such as [scalable javascript architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture-2012) or [large scale javascript](http://addyosmani.com/largescalejavascript/).

His motive was to avoid end up doing the same stuff all over again. He wanted an application that **keeps working and doesn't break** no matter what. That's what Artery is about.

 ### Structure

 ### Maintainability

 ### Reusability


**Don't be a fool!** There is great tools out there such as Backbone, Angular or Ember, but none of them give a structure to your web application. Because doing a scalable application is way more complicated than doing a todo list, you should take the time to architecture it.

## Installation


Artery has first-class support for [component](http://github.com/component) and support other package manager tools such as browserify or bower.

component:

    $ component install bredele/artery

browerify;

    $ npm install artery

standalone:

    <script src="artery.js"></script>

## License

  MIT
