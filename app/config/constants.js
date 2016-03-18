export const API = 'https://apis.conmetwheelends.com/aftermarket/v3';
export const SUBSCRIPTION_KEY='afde8a71a2084efeb617d4533c98d02d';
export const V2KEY='558c6251756c44ce9eacda5f6ffe34ca';
export const ADD_FILTER='ADD_FILTER';
export const UPDATE_FILTER='UPDATE_FILTER';
export const REMOVE_FILTER='REMOVE_FILTER';
export const REQUEST_HUB='REQUEST_HUB';
export const UPDATE_LAST_PAGE='UPDATE_LAST_PAGE';
export const UPDATE_STEP='UPDATE_STEP';
export const INCREMENT_STEP='INCREMENT_STEP';
export const DECREMENT_STEP='DECREMENT_STEP';
export const SET_TRUCK_MAKE='SET_TRUCK_MAKE';
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
export const PARTS_RESULT='PARTS_RESULT';
export const RESET_FILTER='RESET_FILTER';
export const RECIEVE_FILTERS='RECIEVE_FILTERS'
export const SET_MATERIAL_FILTER='SET_MATERIAL_FILTER';
export const INVALIDATE_FILTERS='INVALIDATE_FILTERS';
export const REQUEST_FILTERS='REQUEST_FILTERS';
export const UPDATE_FILTER_ID='UPDATE_FILTER_ID';
export const RESET_APP_STATE='RESET_APP_STATE';
export const RECIEVE_CATEGORIES='RECIEVE_CATEGORIES';
export const REQUEST_CATEGORIES='REQUEST_CATEGORIES';
export const INVALIDATE_CATEGORIES='INVALIDATE_CATEGORIES';
export const UPDATE_FILTER_VALUE='UPDATE_FILTER_VALUE';
export const PREVIOUS_FILTER_INDEX='PREVIOUS_FILTER_INDEX';
export const RECIEVE_ASSEMBLY_DETAILS='RECIEVE_ASSEMBLY_DETAILS'
export const REQUEST_ASSEMBLY_DETAILS='REQUEST_ASSEMBLY_DETAILS'
export const INVALIDATE_ASSEMBLY_DETAILS='INVALIDATE_ASSEMBLY_DETAILS'
export const RECIEVE_IMAGES='RECIEVE_IMAGES'
export const REQUEST_IMAGES='REQUEST_IMAGES'
export const INVALIDATE_IMAGES='INVALIDATE_IMAGES'
export const INCACHE_IMAGE='INCACHE_IMAGE'
export const NO_IMAGE='NO_IMAGE'
export const ZERO_RESULTS = 'ZERO_RESULTS';
export const SUCCESS = 'SUCCESS';
export const OK = 'OK';

export const FINDER_START = '/hub-selection/truck-type'

export const STEP_NAVIGATION = [
	{ id: 0, path: '/hub-selection/choose-path'},
	{ id: 2, path: '/hub-selection/truck-type'},
	{ id: 5, path: '/hub-selection/truck-make'},
	{ id: 7, path: '/hub-selection/axle-type'},
	{ id: 8, path: '/hub-selection/gawr'},
	{ id: 12, path: '/hub-selection/axle-stud'},
	{ id: 9, path: '/hub-selection/wheel-type'},
	{ id: 10, path: '/hub-selection/material'},
	{ id: 11, path: '/hub-selection/hub-type'},
	{ id: 12, path: '/hub-selection/results'}
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

export const FILTERSTATE = {
	filterId: 0,
	partNumbers: '~',
	aftermarketPartTypeIds: 1,
	truckCompartmentIds: 1, //1 = Tractor
	dutyRatingIds: 1, // 1 = Heavy Duty
	brakeTypeIds: 1, // 1 = Drum Brakes,
	truckMakeIds: '~', // 1 = Freightliner
	axlePositionIds: '~',
	axleNameIds: '~',
	grossAxleWeightRatingRangeIds: '~',
	wheelTypeStudLengthIds: '~',
	searchText: ''
}

export const MATERIAL_ALL=0;
export const MATERIAL_ALUMINUM=1;
export const MATERIAL_IRON=2;

export const FILTER_VALUES = [
  {
    Id: 0,
    Name: 'Hub Assembly Number | Aftermarket Description',
    Sort: 0,
    UrlParameterName: 'aftermarketHubAssemblyNumbers'
  },
  {
    Id: 2,
    Name: 'Truck Compartment',
    Sort: 1,
    UrlParameterName: 'truckCompartmentIds'
  },
  {
    Id: 5,
    Name: 'Truck Make',
    Sort: 2,
    UrlParameterName: 'truckMakeIds'
  },
  {
    Id: 7,
    Name: 'Axle Name',
    Sort: 3,
    UrlParameterName: 'axleNameIds'
  },
  {
    Id: 8,
    Name: 'Gross Axle Weight Rating (GAWR) Range',
    Sort: 4,
    UrlParameterName: 'grossAxleWeightRatingRangeIds'
  },
  {
    Id: 12,
    Name: 'Axle Stud Thread Diameter',
    Sort: 5,
    UrlParameterName: 'axleStudThreadIds'
  },
  {
    Id: 9,
    Name: 'Wheel Material / Stud Length',
    Sort: 6,
    UrlParameterName: 'wheelMaterialStudLengthClassIds'
  },
  {
    Id: 10,
    Name: 'Hub Casting Material Type',
    Sort: 7,
    UrlParameterName: 'hubCastingMaterialTypeIds'
  },
  {
    Id: 11,
    Name: 'Hub Assembly Type',
    Sort: 8,
  	UrlParameterName: 'hubAssemblyTypeIds'
  }
]

export const APPSTATE = {
	goingBack: false,
	isFetching: false,
	needsFetch: true,
	lastPath: '',
	step: 1,
	categories: FILTER_VALUES,
	currentIndex: 1,
	filterResults: [],
	lastChoice: {},
	filterState: [
		'~', 	//aftermarketHubAssemblyNumbers
		'~', 	//truckCompartmentIds
		'~', 	//truckMakeIds
		'~', 	//axleNameIds
		'~', 	//grossAxleWeightRatingRangeIds
		'~', 	//axleStudThreadIds
		'~', 	//wheelMaterialStudLengthClassIds
		'~', 	//hubCastingMaterialTypeIds
		'~'		//hubAssemblyTypeIds
	]
}

export const DETAILS_TPL = {
	id: -1,
	image: 'hub-fpo.png',
	title: ''
}
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
