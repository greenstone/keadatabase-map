export const defaultQuery = `?
title=Recent Sightings&
description=Last xx number of new and public sightings&
layers[0][label]=New Sightings&
layers[0][status]=new&
layers[1][label]=Moderated Sightings
layers[1][status]=public&
`;

export const allQuery = `?
title=All Sightings&
description=Last 10000 new, public and captive sightings&
layers[0][label]=New Sightings&
layers[0][status]=new&
layers[0][page_size]=10000&
layers[1][label]=Moderated Sightings&
layers[1][status]=public&
layers[1][page_size]=10000&
layers[2][label]=Captive Sightings&
layers[2][status]=captive&
layers[2][page_size]=10000
`;

export const fwfQuery = `?
title=FWF Sightings&
description=Fiordland Wapiti Foundation sightings&
layers[0][label]=FWF Sightings&
layers[0][status]=fwf
`;
