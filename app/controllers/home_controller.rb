class HomeController < ApplicationController
  def index

  end

  def ajax

    mapper = CitymapperService.new("the_dummy_password")

    @json = mapper.getTimeBetween(params[:start], params[:end], params[:time])
    render json: @json
  end
end
