// API
export const API = 'https://api.conmetwheelends.com/aftermarket/v10';
export const SUBSCRIPTION_KEY='afde8a71a2084efeb617d4533c98d02d';
export const IMAGE_CDN = 'https://conmetaftermarketimages.azureedge.net/images/';
export const V2KEY='de21c7db30a94f659cf8a8665805acba';

// APP
export const UPDATE_LAST_PAGE='UPDATE_LAST_PAGE';
export const UPDATE_STEP='UPDATE_STEP';
export const INCREMENT_STEP='INCREMENT_STEP';
export const DECREMENT_STEP='DECREMENT_STEP';
export const RESET_APP_STATE='RESET_APP_STATE';

//HUBS AND ASSEMBLIES
export const REQUEST_HUB='REQUEST_HUB';
export const REQUEST_ASSEMBLIES='REQUEST_ASSEMBLIES'
export const RECEIVE_ASSEMBLIES='RECEIVE_ASSEMBLIES'
export const INVALIDATE_ASSEMBLIES='INVALIDATE_ASSEMBLIES'
export const RECEIVE_HUBS='RECEIVE_HUBS'
export const REQUEST_HUBS='REQUEST_HUBS'
export const INVALIDATE_HUBS='INVALIDATE_HUBS'
export const SHOW_PREVIOUS_RESULT='SHOW_PREVIOUS_RESULT'
export const SHOW_NEXT_RESULT='SHOW_NEXT_RESULT'
export const SHOW_RESULT_AT_IDX='SHOW_RESULT_AT_IDX'
export const ASSEMBLY_RESULT='ASSEMBLY_RESULT';
export const SEARCH_ASSEMBLY_RESULT='SEARCH_ASSEMBLY_RESULT'

//CATEGORIES
export const RECIEVE_CATEGORIES='RECIEVE_CATEGORIES';
export const REQUEST_CATEGORIES='REQUEST_CATEGORIES';
export const INVALIDATE_CATEGORIES='INVALIDATE_CATEGORIES';

//FILTERS
export const SET_TRUCK_MAKE='SET_TRUCK_MAKE';
export const ADD_FILTER='ADD_FILTER';
export const UPDATE_FILTER='UPDATE_FILTER';
export const REMOVE_FILTER='REMOVE_FILTER';
export const UPDATE_FILTER_VALUE='UPDATE_FILTER_VALUE';
export const PREVIOUS_FILTER_INDEX='PREVIOUS_FILTER_INDEX';
export const RESET_FILTER='RESET_FILTER';
export const RECIEVE_FILTERS='RECIEVE_FILTERS'
export const SET_MATERIAL_FILTER='SET_MATERIAL_FILTER';
export const INVALIDATE_FILTERS='INVALIDATE_FILTERS';
export const REQUEST_FILTERS='REQUEST_FILTERS';
export const NEXT_FILTER_INDEX='NEXT_FILTER_INDEX';
export const UPDATE_FILTER_ID='UPDATE_FILTER_ID';
export const SET_RESULT_INDEX='SET_RESULT_INDEX';

//DETAILS
export const RECIEVE_ASSEMBLY_DETAILS='RECIEVE_ASSEMBLY_DETAILS'
export const REQUEST_ASSEMBLY_DETAILS='REQUEST_ASSEMBLY_DETAILS'
export const INVALIDATE_ASSEMBLY_DETAILS='INVALIDATE_ASSEMBLY_DETAILS'

// PARTS
export const PARTS_RESULT='PARTS_RESULT';
export const RECIEVE_PARTS='RECIEVE_PARTS'
export const REQUEST_PARTS='REQUEST_PARTS'
export const INVALIDATE_PARTS='INVALIDATE_PARTS'

// IMAGES
export const RECIEVE_IMAGES='RECIEVE_IMAGES'
export const REQUEST_IMAGES='REQUEST_IMAGES'
export const INVALIDATE_IMAGES='INVALIDATE_IMAGES'
export const INCACHE_IMAGE='INCACHE_IMAGE'
export const NO_IMAGE='NO_IMAGE'

// STATUS
export const ZERO_RESULTS = 'ZERO_RESULTS';
export const SUCCESS = 'SUCCESS';
export const OK = 'OK';

export const FINDER_START = '/hub-selection/truck-type'

export const STEP_NAVIGATION = [
	{ id: 0, path: '/hub-selection/choose-path'}, //0
	{ id: 15, path: '/hub-selection/choose-path'}, //1
	{ id: 2, path: '/hub-selection/truck-type'}, //2
	{ id: 5, path: '/hub-selection/truck-make'}, //3
	{ id: 7, path: '/hub-selection/axle-type'}, //4
	{ id: 14, path: '/hub-selection/hub-mounting-system'}, //5
	{ id: 8, path: '/hub-selection/gawr'}, //6
	{ id: 12, path: '/hub-selection/axle-stud'},//7
	{ id: 9, path: '/hub-selection/wheel-type'},//8
	{ id: 10, path: '/hub-selection/material'},//9
	{ id: 11, path: '/hub-selection/hub-type'},//10
	{ id: 12, path: '/hub-selection/results'} //11
]

export const RESULTS = {
	receivedAt: '',
	type: '',
	selectedIdx: 0,
	total: 0,
	selected: {},
	items: [],
	isFetching: false
}

export const MATERIAL_ALL=0;
export const MATERIAL_ALUMINUM=1;
export const MATERIAL_IRON=2;

export const APPSTATE = {
	goingBack: false,
	isFetching: false,
	needsFetch: true,
	lastPath: '',
	step: 1,
	categories: [],
	currentIndex: 1,
	filterResults: [],
	lastChoice: {},
	filterState: {
		brkty: null, // brakeType,
		hatyp: null, // hubAssemblyType
		hcmty: null, // hubCastingMaterialType
		wmslc: null,  // wheelMaterialStudLengthClass
		axthd: null,  // axleStudThreadDiameter
		gawrr: null, // grossAxleWeightRatingRange
		hamnt: null, // hubMountingSystem
		aaxna: null, // aftermarketAxleName
		tmake: null, // truckMake
		tcomp: null, // truckCompartment
		hanum: null, // hubAssemlySummary
		srcht: ''
	}
}

export const DETAILS_TPL = {
	id: -1,
	image: 'hub-fpo.png',
	title: ''
}

export const PARTTYPES = [
	{
		'PartTypeId': 5,
		'AftermarketPartTypeName': 'Wheel Stud',
		'InternalPartTypeName': 'Wheel Stud'
	},
	{
		'PartTypeId': 6,
		'AftermarketPartTypeName': 'Axle Stud',
		'InternalPartTypeName': 'Double-Ended Stud'
	},
	{
		'PartTypeId': 7,
		'AftermarketPartTypeName': 'ABS Tone Ring',
		'InternalPartTypeName': 'ABS Tone Ring'
	},
	{
		'PartTypeId': 8,
		'AftermarketPartTypeName': 'Fill Plug',
		'InternalPartTypeName': 'Port Plug'
	},
	{
		'PartTypeId': 101,
		'AftermarketPartTypeName': 'Bearing Set',
		'InternalPartTypeName': 'Bearing Cup & Cone Assembly',
		'Usages': [
			'',
			' (Inner)',
			' (Outer)'
		]
	},
	{
		'PartTypeId': 115,
		'AftermarketPartTypeName': 'Complete Hub Assembly',
		'InternalPartTypeName': 'Hub Assembly'
	},
	{
		'PartTypeId': 217,
		'AftermarketPartTypeName': 'PreSet Complete Hub Rebuild Kit (Keyway)',
		'InternalPartTypeName': 'PreSet Complete Hub Rebuild Kit (Keyway)'
	},
	{
		'PartTypeId': 218,
		'AftermarketPartTypeName': 'PreSet Complete Hub Rebuild Kit (D Flat)',
		'InternalPartTypeName': 'PreSet Complete Hub Rebuild Kit (D Flat)'
	},
	{
		'PartTypeId': 219,
		'AftermarketPartTypeName': 'PreSet / PreSet Plus Hub Rebuild Kit',
		'InternalPartTypeName': 'PreSet / PreSet Plus Bearing, Seal & Spacer Kit'
	},
	{
		'PartTypeId': 220,
		'AftermarketPartTypeName': 'Wheel Seal',
		'InternalPartTypeName': 'Wheel Seal'
	},
	{
		'PartTypeId': 221,
		'AftermarketPartTypeName': 'Wheel Seal and Spacer Kit',
		'InternalPartTypeName': 'Wheel Seal and Spacer Kit'
	},
	{
		'PartTypeId': 222,
		'AftermarketPartTypeName': 'PreSet Spindle Nut Kit (D Flat)',
		'InternalPartTypeName': 'PreSet Spindle Nut Kit (D Flat)'
	},
	{
		'PartTypeId': 223,
		'AftermarketPartTypeName': 'PreSet Spindle Nut Kit (Keyway)',
		'InternalPartTypeName': 'PreSet Spindle Nut Kit (Keyway)'
	},
	{
		'PartTypeId': 226,
		'AftermarketPartTypeName': 'PreSet Plus Spindle Nut Kit (D Flat)',
		'InternalPartTypeName': 'PreSet Plus Spindle Nut Kit (D Flat)'
	},
	{
		'PartTypeId': 227,
		'AftermarketPartTypeName': 'PreSet Plus Spindle Nut Kit (Keyway)',
		'InternalPartTypeName': 'PreSet Plus Spindle Nut Kit (Keyway)'
	}
]

export const AFTERMARKET_DETAILS = [
	{
		id: 10082200,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082201,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082202,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082203,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082204,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082205,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082206,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082207,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082208,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082209,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082210,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082211,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082212,
		material: 'Aluminum',
		title: 'Aluminum PreSet FL Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082213,
		material: 'Aluminum',
		title: 'Aluminum PreSet FL Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082214,
		material: 'Ductile Iron',
		title: 'Iron PreSet FL Front',
		image: 'IR-FL-0500.png'
	},
	{
		id: 10082215,
		material: 'Ductile Iron',
		title: 'Iron PreSet FL Front',
		image: 'IR-FL-0500.png'
	},
	{
		id: 10082216,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082217,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082218,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	},
	{
		id: 10082219,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	},
	{
		id: 10082220,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082221,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082222,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	},
	{
		id: 10082224,
		material: 'Aluminum',
		title: 'Aluminum PreSet TN Trailer',
		image: 'AL-TN-0500.png'
	},
	{
		id: 10082226,
		material: 'Ductile Iron',
		title: 'Iron PreSet TN Trailer',
		image: 'IR-TN-0500.png'
	},
	{
		id: 10082249,
		material: 'Aluminum',
		title: 'Aluminum Conventional TN Trailer',
		image: 'AL-TN-0500.png'
	},
	{
		id: 10082251,
		material: 'Ductile Iron',
		title: 'Iron Conventional TN Trailer',
		image: 'IR-TN-0500.png'
	},
	{
		id: 10082228,
		material: 'Aluminum',
		title: 'Aluminum PreSet TP Trailer',
		image: 'AL-TP-0500.png'
	},
	{
		id: 10082253,
		material: 'Aluminum',
		title: 'Aluminum Conventional TP Trailer',
		image: 'AL-TP-0500.png'
	},
	{
		id: 10082230,
		material: 'Ductile Iron',
		title: 'Iron PreSet TP Trailer',
		image: 'IR-TP-0500.png'
	},
	{
		id: 10082255,
		material: 'Ductile Iron',
		title: 'Iron Conventional TP Trailer',
		image: 'IR-TP-0500.png'
	}

]
