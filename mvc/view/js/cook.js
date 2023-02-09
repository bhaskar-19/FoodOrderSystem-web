function deleteAndDisapper(e)
{   
    $.ajax({
        'method' : 'DELETE',
        contentType : 'application/json',
        'url' : "http://localhost:3000/order/deleteOrder/"+e.id,
    });        
}

function addOrderCard(obj)
{

    let templateString1 = '<div onclick="deleteAndDisapper(this)" id = "'+obj.orderId+'"style="display:none" class="col-xs-12 col-sm-6 col-md-4"><div class="card mb-4" style="background-color:lightskyblue"><div class="card-body"><h5 class="card-title" style="text-align :center">Ordered id :'+obj.orderId+' </h5><table id="" class="table"><thead class="thead-dark"><tr><th scope="col" id="sl">#</th><th scope="col" id="item">Items</th>  </tr></thead><tbody id = "itemBody">';
            
    var ind = 0;
    var templateString2 = '';
    $.each(obj.items, function(j){
        templateString2 += '<tr><th scope="row" id="sl">'+(ind+1)+'</th><td id="item">'+obj.items[j].item+' X'+obj.items[j].quantity+'</td></tr>';
        ind++;
    });
    
    let templateString3 = '</tbody></table><center><a   href="#'+obj.orderId+'" class="btn btn-primary" style="text-align: center;">Done</a> </center></div></div></div>';
    let templateString = templateString1+templateString2+templateString3;
    $("#cardbody").append(templateString);

    let x=$("#cardbody").children().last();
    setTimeout(()=>x.slideDown(),500);


    let trackingTemplate = `<div class="cardp" id="processing${obj.orderId}" style="display=none">
    <div class="card-body">
        <h2 class="card-title">OrderId: ${obj.orderId}</h2>
    </div>
    </div>`

    $("#ordersProcessing").append(trackingTemplate);
    
    let y = $("#ordersProcessing").children().last();
    setTimeout(()=>y.fadeIn(),500);

}


$(document).ready(()=>{
    var currentOrders = [];
    
    setInterval(()=>{$.get('http://localhost:3000/order/fetchOrders',(obj, status)=>{
        

        //Initially There can be orders
        let initial = false;
        if(currentOrders.length == 0)
        {
            initial = true;
            currentOrders.push(...obj); 
        }

        let count=0;
        if(initial)
        {
            for(let i=0; i<currentOrders.length; i++)
            {
                addOrderCard(currentOrders[i]); //it will add a card to chief interface 
                                                // and Tracking page
            }
            
        }
    
        //If the order is not present in ordersProcessing table but it is present in chief interface (i.e in current Orders array) 
        //then delete a order from currentOrders Array and disable a order from cheif interface 
        for(let i=0; i<currentOrders.length; i++)
        {
            let flag =0
            for(let j=0; j<obj.length; j++)
            {
                if(currentOrders[i].orderId == obj[j].orderId)
                {
                    flag = 1;
                    break;
                }
            }
            if(flag == 0)
            {
                $("#"+currentOrders[i].orderId).fadeOut();//fade out from chief interface
                $("#processing"+currentOrders[i].orderId).fadeOut();//fade out from tracking page that is in processingOrder container


                //if the order is done then add card to tracking page that is in orderDone container
                let trackingTemplate = `<div style="display:none"class="card" id="card">
                <div class="card-body">
                    <h2 class="card-title">OrderId${currentOrders[i].orderId}</h2>
                </div>
                </div>`
                $("#ordersDone").append(trackingTemplate);
                let x = $("#ordersDone").children().last();
                setTimeout(()=>x.fadeIn(),500);
                setTimeout(()=>x.fadeOut(),5000);

                currentOrders.splice(i, 1);// deleteing a order from currentOrders array
            }
        }
        

        //if the order is present in OrdersProcessing collection but it is not present in currentOrders array then 
        // add order to currentOrders and add a card to chief interace and tracking interface that is in ordersProcessing container
        for(let i=0; i<obj.length; i++)
        {
            let flag =0;
            for(let j=0; j<currentOrders.length; j++)
            {
                if(currentOrders[j].orderId == obj[i].orderId)
                {
                    flag = 1;
                    break;
                }
            }
            if(flag == 0)
            {
                currentOrders.push(obj[i]);
                addOrderCard(obj[i]);
            }
        }

    })},1000);

});

