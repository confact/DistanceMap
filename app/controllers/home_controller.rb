class HomeController < ApplicationController
  def index

  end

  def ajax
    ## initialize the citymapper API
    mapper = CitymapperService.new('the_dummy_password')
    ## call the city mapper API's time between
    @json = mapper.getTimeBetween(params[:start], params[:end], params[:timedate])
    ## render json of the response
    render json: @json
  end
end
