import React, { useState, useEffect } from 'react';
import useForm from './useForm ';
import validate from './validate';
import fetchAdditionalQuestions from './fetchAdditionalQuestions';

const SurveyForm = () => {
    const { handleChange, values, handleSubmit, errors, handleSelectChange } = useForm(validate);
    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    useEffect(() => {
        if (values.topic) {
        fetchAdditionalQuestions(values.topic).then((questions) => {
            setAdditionalQuestions(questions);
        });
        }
    }, [values.topic]);

    return (
        <div className="form-container">
        <h1>Survey Form</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-field">
            <label>Full Name</label>
            <input
                type="text"
                name="fullName"
                value={values.fullName || ''}
                onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            <div className="form-field">
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-field">
            <label>Survey Topic</label>
            <select name="topic" value={values.topic || ''} onChange={handleSelectChange}>
                <option value="">Select Topic</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
            </select>
            {errors.topic && <p className="error">{errors.topic}</p>}
            </div>

            {values.topic === 'Technology' && (
            <div className="section">
                <div className="form-field">
                <label>Favorite Programming Language</label>
                <select name="language" value={values.language || ''} onChange={handleChange}>
                    <option value="">Select Language</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                </select>
                {errors.language && <p className="error">{errors.language}</p>}
                </div>

                <div className="form-field">
                <label>Years of Experience</label>
                <input
                    type="number"
                    name="experience"
                    value={values.experience || ''}
                    onChange={handleChange}
                />
                {errors.experience && <p className="error">{errors.experience}</p>}
                </div>
            </div>
            )}

            {values.topic === 'Health' && (
            <div className="section">
                <div className="form-field">
                <label>Exercise Frequency</label>
                <select name="exerciseFrequency" value={values.exerciseFrequency || ''} onChange={handleChange}>
                    <option value="">Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
                </div>

                <div className="form-field">
                <label>Diet Preference</label>
                <select name="dietPreference" value={values.dietPreference || ''} onChange={handleChange}>
                    <option value="">Select Diet</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
                </div>
            </div>
            )}

            {values.topic === 'Education' && (
            <div className="section">
                <div className="form-field">
                <label>Highest Qualification</label>
                <select name="qualification" value={values.qualification || ''} onChange={handleChange}>
                    <option value="">Select Qualification</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                </select>
                {errors.qualification && <p className="error">{errors.qualification}</p>}
                </div>

                <div className="form-field">
                <label>Field of Study</label>
                <input
                    type="text"
                    name="fieldOfStudy"
                    value={values.fieldOfStudy || ''}
                    onChange={handleChange}
                />
                {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
                </div>
            </div>
            )}

            <div className="form-field">
            <label>Feedback</label>
            <textarea
                name="feedback"
                value={values.feedback || ''}
                onChange={handleChange}
            />
            {errors.feedback && <p className="error">{errors.feedback}</p>}
            </div>

            {additionalQuestions.length > 0 && (
            <div className="additional-questions">
                <h2>Additional Questions</h2>
                {additionalQuestions.map((question, index) => (
                <div className="form-field" key={index}>
                    <label>{question.label}</label>
                    <input
                    type={question.type}
                    name={`additional-${question.id}`}
                    value={values[`additional-${question.id}`] || ''}
                    onChange={handleChange}
                    />
                </div>
                ))}
            </div>
            )}

            <button type="submit">Submit</button>
        </form>
        {values.submitted && (
            <div className="form-summary">
            <h2>Survey Summary</h2>
            <p><strong>Full Name:</strong> {values.fullName}</p>
            <p><strong>Email:</strong> {values.email}</p>
            <p><strong>Survey Topic:</strong> {values.topic}</p>
            {values.topic === 'Technology' && (
                <>
                <p><strong>Favorite Programming Language:</strong> {values.language}</p>
                <p><strong>Years of Experience:</strong> {values.experience}</p>
                </>
            )}
            {values.topic === 'Health' && (
                <>
                <p><strong>Exercise Frequency:</strong> {values.exerciseFrequency}</p>
                <p><strong>Diet Preference:</strong> {values.dietPreference}</p>
                </>
            )}
            {values.topic === 'Education' && (
                <>
                <p><strong>Highest Qualification:</strong> {values.qualification}</p>
                <p><strong>Field of Study:</strong> {values.fieldOfStudy}</p>
                </>
            )}
            <p><strong>Feedback:</strong> {values.feedback}</p>
            {additionalQuestions.length > 0 && (
                <div className="additional-summary">
                <h3>Additional Questions</h3>
                {additionalQuestions.map((question, index) => (
                    <p key={index}><strong>{question.label}:</strong> {values[`additional-${question.id}`]}</p>
                ))}
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default SurveyForm;
