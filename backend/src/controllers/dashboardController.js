const { DashboardUtil } = require('../utils/index')
const AccountService = require('../services/accountService')
const PaymentService = require('../services/paymentService')
var accountService = new AccountService()   
var paymentService = new PaymentService()

// Metric controllers
const getDashboardContentController = (req, res, next) => {
    accountService.getAllAccounts(req.user.userId , (err,data) => {
        return res.json({
            data: DashboardUtil.parseAccountDataIntoChartData(data),
            success:true
        })
    })

}

// Accounts controllers
const getUserAccountsController = (req, res, next) => {
    accountService.getAllAccounts(req.user.userId, (err,data) => {
        return res.json({
            data: err ? err : data,
            success: err ? false : true
        })
    })
}

const getUserPaymentsController = (req, res, next) => {
    // mock data for tables
    const data = [
        { name: 'Jimmy Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/28/2021' },
        { name: 'Johnny Tran', accountName: 'Discover', amountPaid: 31, paymentDate:'10/08/2021' },
        { name: 'Jacky Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/30/2021' },
        { name: 'Jenny Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/31/2021' }
    ]

    return res.json({
        data: data,
        success:true
    })
}

const createAccountController = (req, res, next) => {
    accountService.createAccount(req.body.name, req.body.balance, req.body.accountHolder, req.user.userId, (err, data) => {
        return res.json({
            success: err ? false : true,
            data: data
        })
    });
}

const updateAccountController = (req, res, next) => {
    accountService.updateAccount(req.body.filter, req.body.update, (err, data) => {
        return res.json({
            success: data ? true : false,
            data: data
        })
    });
}

const deleteAccountController = (req, res, next) => {
    accountService.deleteAccount(req.body.id, (err, data) => {
        return res.json({
            success: data ? true : false,
            data: data
        })
    });
}


// Payment controllers
const getPaymentsController = (req, res, next) => {
    paymentService.getAllPayments(req.user.userId, (err, data) => {
        return res.json({
            success: err ? false : true,
            data: err ? err : data
        })
    });
}

const createPaymentController = (req, res, next) => {
    paymentService.createPayment(req.user.userId, req.body.name, req.body.accountName, req.body.amountPaid, req.body.paymentDate, (err, data) => {
        return res.json({
            success: err ? false : true,
            data: err ? err : data
        })
    });
}

const deletePaymentController = (req, res, next) => {
    paymentService.deletePayment(req.body.id, (err, data) => {
        return res.json({
            success: err ? false : true,
            data: err ? err : data
        })
    });
}


module.exports = { 
    getDashboardContentController, 
    createAccountController, 
    deleteAccountController,
    updateAccountController,
    getUserAccountsController,
    getUserPaymentsController,
    createPaymentController,
    deletePaymentController,
    getPaymentsController
};