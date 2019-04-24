# Prodavachnik

## Introduction

###  Prodavachnik  is a Web Application, created withAngularJS and using MongoDB as database.It is made as a project for the AngularJS course exam in SoftUni.

## Description

The project resembles a sales/offers website where the users can list offers, buy and sell items. Much like "OLX.bg" and "Amazon.com" it displays created offers and allows users to interract with eachother. Two types of roles are implemented in this project: admin , user(regular user with no admin rights). Depending on the role you can have access to different parts and functionalities. Users: can create offers and view all available offers including their own in details. Admins: including the regular users rights they can create, edit and delete all offers in the database.  

 ## Strucutre
 3 main parts:
 * public 
 * private
 * administrative
 
 
  The public part is visible just for non-authentication:
*	Home page background with no functionality
*	Home button leading nowhere yet
*	Sign In button ( leading to signin form)
*	Sign Up button ( leading to signup form)

 The private part is available to registered users only:
*	Home page is now different static page(greeting).
* All products button - leads to a page where the offers from all users are listed
* My product button - leads to a page where the current users offers are listed
* Create product button - leads to a creation form for an offer
*	Offers can be viewed in detail by having a details button(leads to details page)
*	Logout button
  

 The administrative part is available to users with the role “Admin”:

*	Delete button on each offer in the Details page list(deletes the offer from DB)
*	Edit button on each offer in the Details page list(leads to edit offer form and updates the changes on the current offer after submit)

An Admin is manually seeded into the database:
*	Admin(with admin rights): Email: admin@admin.com Name: Admin Password: Admin


## Installation 

### Server: “Server” folder 
  #### Install dependencies: *npm install* , start the client: *node index* (port: 5000).

### Client: “Client” folder (React web app)
  #### Install dependencies: *npm install* , start the client: *ng serve* (port: 4200).
  







