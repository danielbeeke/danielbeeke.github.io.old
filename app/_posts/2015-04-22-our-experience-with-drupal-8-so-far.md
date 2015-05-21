---
title:  "Our experience with Drupal 8 so far"
categories:
- Drupal 8
- Beta
image: drupal.jpg
color: 2466ab
published: true
---

At [Studio Fonkel](http://studiofonkel.nl) we are building our first Drupal 8 site for a customer. We started with beta 7 and are enjoying it a lot. Let us talk about the nice and the ugly things of Drupal 8.

## The nice

### Configuration in YAML files, good bye features!

In Drupal 8 all configuration goes through an abstraction system, that saves it into yaml files. This is perfect for a git based workflow. It seems that somewhere around beta 3 the yaml files get stored into the database. I tried out Drupal 8 before that change and enjoyed pulling things from git, doing a cache rebuild and seeing the results, so we decided to configure that for this site too.

See [File system based workflow](https://www.drupal.org/node/2416555) & [Changing The Storage Location of Active and Staging Directories](https://www.drupal.org/node/2431247) for more info.

### Views in core, and a lot more in core

All the core content overviews are views, customizations are very simple now. A lot more is in core, for this site we used the following contributed modules: [devel](https://www.drupal.org/project/devel), [ds](https://www.drupal.org/project/ds), [entity reference revisions](https://www.drupal.org/project/entity_reference_revisions) and [paragraphs](http://drupal.org/project/paragraphs).

Good things that are now in core are:

* Contact form entities (formerly we used entity forms)
* Translations modules (formerly l10n and i14n)
* Ckeditor
* Entity Reference, telephone, link and date fields

### Drupal console

The new Drupal console helps with creating boilerplates for modules, entity types etc. It is very handy, it can create a custom entity type in seconds.

### Ease of creating new plugins

At Studio Fonkel we are really fond of Display Suite, because it creates a perfect transition place for components from the backend to the frontend. It is also a very simple, and elegant solution for creating good and clean markup.

Almost all of the custom content that we had to place inside entity renders, where done with DsField implementations. It is very simple, just copy one of display suite's own fields from the src/Plugin/DsField folder and place it in a custom module in src/Plugin/DsField and adjust the code.

The same way you can add field formatters and other plugins. Everything is an annotated plugin. In the top you define what it is (old d7 info hooks) and in the class you create the functions that are needed.

Because of the object orientated structures missing required functions will throw an error. I think the developer experience in Drupal 8 is a lot nicer.

## The ugly

### Not everything is available

We needed checkboxes in an exposed filter with a view. Turns out this is not possible yet. We decided we would create the form with code, so it added a bit of work, but in the end it was more flexible for our purpose.

### Unstable?

We heard a couple of stories about Drupal 8 being unstable, one of the things we did, to ensure we would have a good development workflow was creating a git pre commit hook, in which we dumped the database to a sql file. This way we could always restore to every commit, if something would fail. Happily we have not used it for that purpose. No crashes or fatal errors or whatsoever.

### Dependency injection

Maybe this would should be in the top, if I fully grasp the concept of it, but for starting with Drupal 8 it was a bit difficult to have something just working. For example when rendering a contact entity form inside a custom block, it worked fine when logged in, but as soon as I logged out, an exception was thrown and we had a none usable site. Turns out the contact entity form needed a flood controller injected. This is working now, but I want to learn about this concept, so I understand how and why to use it. Documentation is here [ Using a Factory to Create Services](http://symfony.com/doc/current/components/dependency_injection/factories.html).

## Conclusion

For us Drupal 8 is great, it saves a lot of time. We need to learn new things, and I think that is okay. After this project I think we will be better OOP programmers, and have more ideas how to create things in an object orientated way.
