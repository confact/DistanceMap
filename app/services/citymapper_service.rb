
class CitymapperService
  include HTTParty
  base_uri 'citymapper.com'

  #"https://citymapper.com/api/1/traveltime/?startcoord=51.525246%2C0.084672&endcoord=51.559098%2C0.074503&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key="

  def initialize(apikey)
    @apikey = apikey
  end

  ## get time between two cordinates and returns minutes
  def getTimeBetween(startcord, endcord, time)
      options = {
        :startcoord => startcord,
        :endcoord => endcord,
        :time => time,
        :time_type => 'arrival',
        :key => @apikey,
        :format => "json"
      }
      self.class.get "/api/1/traveltime/?#{options.to_query}", {} #options don't work
  end
end
