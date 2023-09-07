const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false
    })

    if(result.error) {
        console.error(result.error)
    } else {
        return result.value
    }
}


export {
    validate
}

