
const responseSetting = (res,method,result,message,isSuccess) => {

    if(method === 'GET' || method === 'PUT')
    {
        return isSuccess 
        ? res.status(200).json(result) // set status to 200 then return result as json
        : res.status(400).json({message});// something went wrong and set status to 400 and return message as json 
    }
    else if(method === 'POST') 
    {
       return !isSuccess
        ?res.status(404).json({message})
        :res.status(201).json(result)
    }
};

export default responseSetting;