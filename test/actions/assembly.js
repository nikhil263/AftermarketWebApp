import {expect} from 'chai'
import {
	receiveAssemblyDetails,
	requestAssemblyDetails,
	invalidateAssemblyDetails,
	fetchAssemblyDetails
} from '../../app/actions/assembly'
import {
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS,
	OK,
	ZERO_RESULTS
} from '../../app/config/constants'



const SUCCESS_MOCK = {
	      Status: OK,
	      Results: [
	          {
							HubAssemblyNumber:'10082201',
							Material:'Aluminum',
							AxlePosition:'Front',
							Axle:'FF',
							HubAssemblyType:'PreSet',
							BrakeType:'Drum',
							HubMountingSystem:'HP10',
							WheelStudStandoutInch:'2.92',
							WheelMaterial:'Aluminum Wheels',
							FlangeOffsetInch:'5.44',
							WeightPound:'37.8',
							IsAftermarketAssembly:true,
							Status:'Active',
							images: []
					}
	      ]
	  }

const FAIL_MOCK = {
			      Status: ZERO_RESULTS,
						Message: 'Message'
			  }

describe('Assembly Actions', () => {
  // it('should receive assemblies after fetch', () => {
	// 	const id = 2
	// 	const expectedAction = {
  //     type: RECIEVE_ASSEMBLY_DETAILS,
	// 		id,
	// 		results: SUCCESS_MOCK.Results
	// 	}
	// 	console.log(receiveAssemblyDetails(id, SUCCESS_MOCK))
	// 	expect(receiveAssemblyDetails(id, SUCCESS_MOCK)).to.eql(expectedAction)
	// })
	//
	// it('should handle receiving zero results', () => {
	// 	const id = 2
  //   const expectedAction = {
  //     type: RECIEVE_ASSEMBLY_DETAILS,
	// 		id,
	// 		results: []
	// 	}
  //   expect(receiveAssemblyDetails(id, FAIL_MOCK)).to.eql(expectedAction)
	// })

	it('should handle request filters notification', () => {
		const id = 1
		const expectedAction = {
      type: REQUEST_ASSEMBLY_DETAILS,
			id
		}
    expect(requestAssemblyDetails(id)).to.eql(expectedAction)
	})

	it('should handle invalidate categories', () => {
    const expectedAction = {
      type: INVALIDATE_ASSEMBLY_DETAILS
		}
    expect(invalidateAssemblyDetails()).to.eql(expectedAction)
	})

})
