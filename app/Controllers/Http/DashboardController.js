"use strict";

class DashboardController {
  async index({ view }) {
    return view.render("frontend.dashboard");
  }
}

module.exports = DashboardController;
