
interface Schema {
    schemaName: string
    properties: string[]
}

export const CRUDFunctionGet =  (schema) => {

   const template: string = `const getAll${schema} = async (ctx: RouterContext) => {
    const ${schema} = await ${schema}Collections.find();
    ctx.response.body = ${schema};
   }`

   return template
}

export const CRUDFunctionGetOne =  (schema) => {

    const template: string = `const get${schema} = async (ctx: RouterContext) => {
        const id = ctx.params.id;
        const ${schema} = await ${schema}collection.findOne({_id: {$oid: id } });
        ctx.response.body = ${schema};
    }`

    return template
}

export const CRUDFunctionCreateOne =  (schema) => {
    
    console.log(schema)
    let parameters: string = ''
    schema.properties.forEach(el => {
        parameters += `${el},`
    })

    const single: string = schema.slice(0,schema.length-1)
    
    const template: string = `const create${schema} = async {ctx: RouterContext} => {
        const {${parameters}} = await ctx.request.body().value;
        const ${single}: any = {
            ${parameters}
        };
        const id = await ${schema}Collection.insertOne();
        ${single}._id = id;
        ctx.response.status = 201
        ctx.response.body = ${single}
    }`


    return template
}

export const CRUDFunctionPatch = (schema, props) => {

    const single: string = schema.slice(0,schema.length-1)


    const template: string = `const update${schema} = async (ctx: RouterContext) => {
        
        const id = ctx.params.id
        const { ${props} } = await ctx.request.body().value;
        const { modified } = await ${schema}Collection.updateOne({ _id: { $oid: id } }, {
            $set: {
                ${props}
            }
        })
        if (!modified) {
            ctx.response.status = 404;
            ctx.response.body = { message: '${single} not found' }
            return;
        }
        ctx.response.body = await ${schema}Collection.findOne({ _id: { $oid: id } })
    }`

    return template

}

export const CRUDFunctionDelete = (schema) => {

    const single: string = schema.slice(0,schema.length-1)

    const template: string = ` const delete${single} = async (ctx: RouterContext) => {    
        const id = ctx.params.id
    
        const ${single} = await ${schema}Collection.deleteOne({ _id: { $oid: id } });
    
        if (!${single}) {
            ctx.response.status = 404;
            ctx.response.body = { message: '${single} not found' }
            return;
        }
        ctx.response.status = 204;
    }`

    return template
} 