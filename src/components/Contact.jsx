import React from "react"

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
                <form className="text-2xl mt-4"
                    onSubmit={this.submitForm}
                    action="https://formspree.io/mwkqbanl"
                    method="POST"
                >
                    Please contact me using the below form. I will respond as quickly as I can. Thank you!
                <div className="min-w-full pr-4">
                        <div className="sm:w-3/4 my-4">
                            <label>Your Email:</label>
                            <input
                                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                placeholder="jane@example.com"
                                type="email"
                                name="email" />
                        </div>
                        <div className="sm:w-3/4 my-4">
                            <label>Your Message:</label>
                            <textarea rows="3"
                                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                placeholder="Hi..."
                                type="textarea"
                                name="message" />
                        </div>
                    </div>

                    {status === "SUCCESS" ? <p>Thanks!</p> : <button className="btn btn-gray">Submit</button>}
                    {status === "ERROR" && <p>Ooops! There was an error.</p>}
                </form>


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