export const SUBSCRIPTION_KEY='a4e3883a1745424c8682d29e2686c663';
export const ADD_FILTER='ADD_FILTER';
export const UPDATE_FILTER='UPDATE_FILTER';
export const REMOVE_FILTER='REMOVE_FILTER';
export const REQUEST_HUB='REQUEST_HUB';
export const UPDATE_LAST_PAGE='UPDATE_LAST_PAGE';




// initial states
export const FILTERSTATE = {
	filterId: '~',
	partNumbers: '~',
	aftermarketPartTypeIds: '~',
	truckCompartmentIds: 'heavyDuty',
	dutyRatingIds: 'heavyDuty',
	brakeTypeIds: 'diskBrakes',
	truckMakeIds: '~',
	axlePositionIds: '~',
	axleNameIds: '~',
	grossAxleWeightRatingRangeIds: '~',
	wheelTypeStudLengthIds: '~',
	searchText: ''
}
export const TRUCKTYPES = [
		'Freightliner', 'Western Star', 'Sterling', 'Kenworth',
		'Peterbilt', 'Volvo', 'Mack', 'Navistar'
];
