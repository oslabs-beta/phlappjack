
interface Schema {
    schemaName: string
    properties: string[]
}

const CRUDFunctionGet =  (schema: Schema) => {

   const template: string = `const getAll${schema.schemaName} = async (ctx: RouterContext) => {
    const ${schema.schemaName} = await ${schema.schemaName}Collections.find();
    ctx.response.body = ${schema.schemaName};
   }`

   return template
}

const CRUDFunctionGetOne =  (schema: Schema) => {

    const template: string = `const get${schema.schemaName} = async (ctx: RouterContext) => {
        const id = ctx.params.id;
        const ${schema.schemaName} = await ${schema.schemaName}collection.findOne({_id: {$oid: id } });
        ctx.response.body = ${schema.schemaName};
    }`

    return template
}

const CRUDFunctionCreateOne =  (schema: Schema) => {
    

    let parameters: string = ''
    schema.properties.forEach(el => {
        parameters += `${el},`
    })

    const single: string = schema.schemaName.slice(0,schema.schemaName.length-1)
    
    const template: string = `const create${schema.schemaName} = async {ctx: RouterContext} => {
        const {${parameters}} = await ctx.request.body().value;
        const ${single}: any = {
            ${parameters}
        };
        const id = await ${schema.schemaName}Collection.insertOne();
        ${single}._id = id;
        ctx.response.status = 201
        ctx.response.body = ${single}
    }`


    return template
}

const CRUDFunctionPatch = (schema: Schema) => {

    let parameters: string = ''
    schema.properties.forEach(el => {
        parameters += `${el},`
    })

    const single: string = schema.schemaName.slice(0,schema.schemaName.length-1)


    const template: string = `const update${schema.schemaName} = async (ctx: RouterContext) => {
        
        const id = ctx.params.id
        const { ${parameters}} = await ctx.request.body().value;
        const { modified } = await ${schema.schemaName}Collection.updateOne({ _id: { $oid: id } }, {
            $set: {
                ${parameters}
            }
        })
        if (!modified) {
            ctx.response.status = 404;
            ctx.response.body = { message: '${single} not found' }
            return;
        }
        ctx.response.body = await ${schema.schemaName}Collection.findOne({ _id: { $oid: id } })
    }`

    return template

}

const CRUDFunctionDelete = (schema: Schema) => {

    const single: string = schema.schemaName.slice(0,schema.schemaName.length-1)

    const template: string = ` const delete${single} = async (ctx: RouterContext) => {    
        const id = ctx.params.id
    
        const ${single} = await ${schema.schemaName}Collection.deleteOne({ _id: { $oid: id } });
    
        if (!${single}) {
            ctx.response.status = 404;
            ctx.response.body = { message: '${single} not found' }
            return;
        }
        ctx.response.status = 204;
    }`

    return template
}