# Kea Database Map

Uses React + Leaflet + Mapbox to consume a GeoJSON feed from the database and present it in different ways.

## Setup

You will need to have Node >= 8 installed (and npm). Then run:  
`npm install`

## Running

To run on your local machine at <http://localhost:3000/> run:  
`npm start`

## Building

To build the app for production use, run:  
`npm build-css` then `npm run build`

## Layout

- `public/` Static HTML files included in build
- `src/` Main source code
  - `assets/` Static assets, including SCSS, grid tiles JSON and logos/banners
  - `helpers/` Various helper components, such as loading spinners

## Deploying

Ensure you have the following:

- The `awscli` Python package installed and configured with id and secret key.
- `REACT_APP_MAPBOX_API_KEY`, `REACT_APP_LINZ_API_KEY`, defined in `.env.local`

To deploy to Amazon S3 (and hence make available online):  
`npm run deploy`

**This will automatically build the source code, and then invalidate the CloudFront cache.**

## Licence

Kea Survey Tool  
Copyright (C) 2019 Greenstone Limited  
hello@greenstone.org.nz

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.
