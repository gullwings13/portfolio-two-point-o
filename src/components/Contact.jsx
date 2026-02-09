import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

export default class Contact extends React.Component
{
    constructor(props)
    {
        super(props)
        this.submitForm = this.submitForm.bind(this)
        this.state = {
            status: ""
        }
    }

    render()
    {
        const { status } = this.state
        return (

            <React.Fragment>
                <form className="text-lg sm:text-xl md:text-2xl mt-4 text-justify"
                    onSubmit={this.submitForm}
                    action="https://formspree.io/mwkqbanl"
                    method="POST"
                >
                    I’d love to hear from you!
                    
                    <div className="min-w-full">
                        <div className="my-4">
                            <label>Your Email:
                            <input
                                    className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                    placeholder="you@example.com"
                                    type="email"
                                    name="email" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label>Your Message:
                            <textarea rows="3"
                                    className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                    placeholder="Hi..."
                                    type="textarea"
                                    name="message" />
                            </label>
                        </div>
                    </div>

                    {status === "SUCCESS" ? <p>Thanks!</p> : <button className="link-pink">submit</button>}
                    {status === "ERROR" && <p>Ooops! There was an error.</p>}
                </form>
                <div className="text-right">
                    <p className="mt-4">You can also find me on:</p>
                    <p>
                        <a className="link-pink" target="_blank" rel="noopener noreferrer" href="https://github.com/gullwings13/">github <FontAwesomeIcon icon={faGithubSquare} />
                        </a>
                    </p>
                    <p>
                        <a className="link-pink" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/trevor-smith-holbourn/">linkedin <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </p>
                    <p>
                        And grab my resume:</p>
                    <p>  <a className="link-pink" target="_blank" rel="noopener noreferrer" href={'/Trev_Holbourn_Resume.pdf'}>here <FontAwesomeIcon icon={faFilePdf} />
                        </a>
                    </p>
                </div>
            </React.Fragment>
        )
    }

    submitForm = (e) =>
    {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const xhr = new XMLHttpRequest()
        xhr.open(form.method, form.action)
        xhr.setRequestHeader("Accept", "application/json")
        xhr.onreadystatechange = () =>
        {
            if (xhr.readyState !== XMLHttpRequest.DONE) return
            if (xhr.status === 200)
            {
                form.reset()
                this.setState({ status: "SUCCESS" })
            } else
            {
                this.setState({ status: "ERROR" })
            }
        }
        xhr.send(data)
    }
}