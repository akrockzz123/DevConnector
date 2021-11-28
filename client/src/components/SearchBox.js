import React, { useState} from 'react'

import { Form, Button } from 'react-bootstrap'

import { Redirect } from 'react-router'
export const SearchBox = ({ history }) => {

    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push(('/posts'))
        }
    }
    const [keyword, setKeyword] = useState('')
    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Posts....'
                className='mr-sm-2 ml-sm-5'
                style={{marginRight: '5px',padding: '4px'}}
                ></Form.Control>
                <Button type='submit'
                variant ='outline-success'
                className ='p-1'
                >
                Search Posts</Button>
            </Form>
        </div>
    )
}

export default SearchBox
