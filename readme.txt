Hi,
We have little excerise for you for our applicant screening.

There is no time limit. Just be creative, 
and show us the best you can do.

And then send your 
source code to jobs@carfromjapan.com :)
Goodluck!

Raw Data
-----------------
-
 stock.csv: Data of cars in stock
- freight.csv: Freight cost by each destination

Formula

-----------------
Car Volume (m3) = Width(mm) * Length(mm) * Height(mm) / 1000000000

Shipping Cost (USD) = Car Volume (m3) * Freight Cost (USD per m3)

Final Price (USD) = Car FOB price (USD) + Shipping Cost (USD)


Requirements
-----------------
1/ Design data schema and import those CSV data into database model.

2/ Create a web app with Nodejs, using ExpressJS & Mongoose.
With a simple user
 interface that allow user to:
- List all stock with these fields: Make, Model,
 FOB Price, Final Price (if selected )
- Allow user to select their destination Country & Port
.
- Search stock by keyword
- If user selected Country & Port, the list will show Final Price
 for each car, otherwise: "ASK".
- Sort stock by Final Price for that Country & Port user
 selected.


Car From Japan Co.,Ltd
www.carfromjapan.com
- END -
