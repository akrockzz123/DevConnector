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
                placeholder='Search Products....'
                className='mr-sm-2 ml-sm-5'
                ></Form.Control>
                <Button type='submit'
                variant ='outline-success'
                className ='p-2'
                >
                Search Posts by user name</Button>
            </Form>
        </div>
    )
}

export default SearchBox
