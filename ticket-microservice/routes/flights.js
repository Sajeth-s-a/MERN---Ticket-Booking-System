const router = require("express").Router();
let Ticket = require("../models/ticket");

/**
 * @swagger
 * /flights/:
 *  get:
 *    summary: Get all flights
 *    description: Used to get all the flights
 *    responses:
 *      '200':
 *        description: Got all flights successfully
 *      '500':
 *        description: Server error
 */
router.route("/").get((req, res) => {
  Ticket.find()
    .then((tickets) => res.status(200).json(tickets))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/:
 *  post:
 *    summary: Creates a new flight.
 *    description: Used to create new flight
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              airlines:
 *                type: String
 *              name:
 *                type: String
 *              from:
 *                type: String
 *              to:
 *                type: String
 *              date:
 *                type: Date
 *              fare:
 *                type: Number
 *            example:
 *              airlines: Air India
 *              name: AI4131
 *              from: PNQ
 *              to: BOM
 *              date: 2020-09-05
 *              fare: 4000
 *    responses:
 *         '200':
 *           description: A successful response
 *         '500':
 *           description: Server error
 */
router.route("/").post((req, res) => {
  const newTicket = new Ticket(req.body);

  newTicket
    .save()
    .then((newTicket ) => res.status(201).json("Show added!"))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/{id}:
 *  get:
 *    summary: Fetch a flight.
 *    description: Used to fetch a single flight
 *    responses:
 *      '200':
 *        description: Successfully fetched flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").get((req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/{id}:
 *  delete:
 *    summary: Delete a flight.
 *    description: Used to delete a flight
 *    responses:
 *      '200':
 *        description: Successfully deleted flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").delete((req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Ticket deleted."))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/{id}:
 *  patch:
 *    summary: Modify a flight.
 *    description: Used to modify existing flight
 *    responses:
 *      '200':
 *        description: Successfully updated flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").patch((req, res) => {
  Ticket.findByIdAndUpdate(req.params.id, req.body)
    .then(res.status(200).json("Ticket updated!"))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/search/:
 *  post:
 *    summary: Search flights
 *    description: Used to search flights
 *    responses:
 *      '200':
 *        description: Successfully searched flights
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: body
 *         name: from
 *         required: true
 *         schema:
 *         type: String
 *         description: Source
 *       - in: body
 *         name: to
 *         required: true
 *         schema:
 *         type: String
 *         description: Destination
 *       - in: body
 *         name: date
 *         required: true
 *         schema:
 *         type: Date
 *         description: Journey date
 */
router.route("/search").post((req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const startDate = Date.parse(req.body.date);
  const endDate = startDate + 24 * 60 * 60 * 1000;
  console.log(endDate);
  Ticket.find({ from, to, date: { $gte: startDate, $lt: endDate } })
    .exec()
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
