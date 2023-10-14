# User Stories for PersonalAccountant

# For Managing Accounts of regular customers who pays at the end of the month
- Replace current system of writing down the accounts / transactions of a particular client on a piece of paper
- Saves Time & Laborious Effort of calulcating money for each client
- 
- 
- 
- 

# To Implement
1. Backend
[] API for posting an account
    
    MODEL: "ACCOUNTS"
    PAYLOAD: { client_name || client_id(ref), product_name, qty, unit_cost, net_price }

[] Same for updating, getting, deleting

# BONUS:
1. Give option to store owners for having pre-stored products which they can just select from dropdown menu or if they don't have one, they can write the name for it.

--- THE BIGGEST PROBLEM SOLVED ---
2. **After calculating a monthly account for a user, print the bill in a table format with all the products & the date of purchase(createdAt)**

