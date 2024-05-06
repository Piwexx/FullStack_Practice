import {render,fireEvent} from "@testing-library/react";
import {Note} from  '../src/components/Note'
import { expect, vitest } from "vitest";


test('renders content',()=>{
    const note = {
        body: "Hola",
        title: "Hola test"
    }
    const component = render(<Note {...note}/>)
    component.debug()
    component.getByText('Hola test')
    expect(component.container).toHaveTextContent(note.body)
    
})