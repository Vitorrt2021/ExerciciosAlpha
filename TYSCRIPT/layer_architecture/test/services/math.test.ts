import sumOne from '../../src/services/math'

describe('SumOne',()=>{
    describe('with integer',()=>{
        test('should be correct',()=>{
            expect(sumOne(1)).toBe(2)
        })
    })
    describe('with real',()=>{
        test('should be correct',()=>{
            expect(sumOne(2.3)).toBe(3.3)
        })
    })
})