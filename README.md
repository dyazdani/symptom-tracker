# Symptom Tracker Project

To get started:

* Fork this repo (Follow these steps: https://docs.github.com/en/get-started/quickstart/fork-a-repo )
* Clone the repo locally

## Project Directory Structure

```
├── data
│   ├── sample-data.json <--------- sample data stored in JSON to display on your website
├── mocks <------------------------ use these wireframes to drive your design and formatting decisions
│   ├── mobile-wireframe.png
│   ├── web-wireframe.png
│   ├── wireframes.excalidraw
├── scripts
│   ├── main.js <------------------ write your JS code here
├── styles
│   ├── style.css <---------------- write your styles here
├── index.html <------------------- main page for the app - load this in your browser to test
```

# Project Goal

Create a simple Symptom Tracker in HTML, CSS and JavaScript.

## Requirements:

* try to keep everything on one screen (no need for routes/page loads)
* use only HTML, CSS & JavaScript (no outside libraries or frameworks)
* dynamically add the data from “sample-data.json” as DOM elements using JavaScript (do not hard-code your HTML!)
* don’t worry about saving data or making buttons clickable for now

## Features:

* header at top of the page displays the app name and the profile image
* display a list of symptoms broken into sections by type (physical, mental, etc)
* each symptom should have buttons to specify severity
  * 0 = none
  * 1 = mild
  * 2 = moderate
  * 3 = severe
* there should be a button to add a new symptom (not yet functional)
* there should be a button to submit the symptoms for the day (not yet functional)

The goal of the assignment is to focus on using JavaScript to dynamically load content. If you only have time to meet the web spec and don’t have time to build out the mobile version, that is okay. Focus on getting all the content to appear on the page properly before adjusting style.
