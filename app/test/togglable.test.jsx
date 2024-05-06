import {render,fireEvent} from "@testing-library/react";
import {Togglable} from  '../src/components/Togglable'
import { beforeEach, describe, expect } from "vitest";


describe('<Toggable/>',()=>{
    let component 

    beforeEach(()=>{
        component = render(
            <Togglable buttonLabel="Test">
              <div className="testDiv">testDivContent</div>
            </Togglable>
        )
    })
    test('renders its children',()=>{
        component.getByText('testDivContent')
    })
    test('renders its children',()=>{
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display:none')
    })
    test('Click',()=>{
        const button = component.getByText('Test')
        fireEvent.click(button)
        
        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display:none')
    })
})
