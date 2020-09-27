import React from 'react'

// bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useForm } from 'react-hook-form'

import './App.scss'

const fields = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    value: '',
    validations: { required: true, minLength: 3 },
    messages: {
      required: 'Name is required',
      minLength: 'Name should be minimum 3 characters'
    }
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter email',
    validations: { required: true, minLength: true },
    messages: {
      required: 'Email is required',
      minLength: 'Email should be minimum 3 characters'
    }
  }
]

function App() {
  const { register, errors, setValue, handleSubmit } = useForm()

  React.useEffect(() => {
    setTimeout(() => {
      setValue('name', 'Bill Dates', {
        shouldValidate: true
      })
    }, 5000)
  }, [setValue])

  const onSubmit = (e) => {
    console.log(e)
    console.log(errors)
  }
  return (
    <div className="App mt-5">
      <Container>
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              {fields.map((field, i) => (
                <Form.Group key={i}>
                  <Form.Control
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    ref={register(field.validations)}
                    isInvalid={errors[field.name]}
                  />
                  {Object.keys(field.messages).map((message, i) => {
                    console.log(errors[field.name])
                    return (
                      errors[field.name] &&
                      errors[field.name].type === message && (
                        <Form.Control.Feedback type="invalid" key={i}>
                          {field.messages[message]}
                        </Form.Control.Feedback>
                      )
                    )
                  })}
                </Form.Group>
              ))}
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    ref={register({ required: true, minLength: 3 })}
                    isInvalid={errors.email}
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <Form.Control.Feedback type="invalid">
                      Email address is required
                    </Form.Control.Feedback>
                  )}
                  {errors.email && errors.email.type === 'minLength' && (
                    <Form.Control.Feedback type="invalid">
                      Email address should be minimum of 3 characters
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  name="address_1"
                  ref={register}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  name="address_2"
                  ref={register}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" ref={register} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    name="state"
                    ref={register}
                  >
                    <option>Choose...</option>
                    <option value="west_bengal">West bengal</option>
                    <option value="bihar">Bihar</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control name="zip" ref={register} />
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                  name="terms_and-conditions"
                  ref={register}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
