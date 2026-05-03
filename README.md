# UFound

### Credit: 
James Pinkham, Sonya Ivkovic, Saim Naushad, Shraddha Venkatesh Sabbavarapu, Jenny Duong

### Tech Stack
TypeScript, React, Node.js, Express, TypeORM, Supabase (PostgreSQL), Leaflet

### Course: 
CS320 – Introduction to Software Engineering (Prof. Jaime Davila, UMass Amherst)

## Overview

UFound is a web-based lost and found system designed for campus communities to efficiently report, track, and recover lost items. The application uses an interactive map interface to visually associate items with their last known or discovered locations.

## Features

* Interactive Campus Map

  Users can drop pins on a Leaflet-based map to mark where an item was lost or found.

* Structured Item Reporting

  Each submission includes category, description, date, and status (lost or found).

* Search & Filtering

  Items can be filtered by category, location, and status for quick discovery.

* Real-Time Updates

  Newly added or updated items appear dynamically to improve responsiveness.

* Item Resolution Tracking

  Reports can be marked as resolved to maintain accurate records.

* User Authentication

  Secure sign-up and login system to allow users to create, manage, and track their own posts.

## Architecture 

**Frontend:** React + Leaflet for map visualization and UI interactions

**Backend:** Node.js + Express REST API

**Database:** PostgreSQL via Supabase, managed using TypeORM

**Data Model:** Supports geotagged items with structured metadata and status lifecycle tracking

## Setup

### Prerequisites
* Node.js (v16+ recommended)
* npm
* Supabase project (PostgreSQL database + credentials)

### Repository
```bash
# Clone the repository
git clone https://github.com/jpinkhamumass/ufound.git
cd ufound
```
### Backend
```bash
cd backend
npm install
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm install leaflet
npm start
```

## Notes

Database credentials are stored in a .env file and excluded from the repository for security reasons.

For access or setup assistance, contact one of the contributors. 
