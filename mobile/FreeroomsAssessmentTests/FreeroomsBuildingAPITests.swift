//
//  FreeroomsBuildingAPITests.swift
//  FreeroomsAssessmentTests
//
//  Created by Anh Nguyen on 31/1/2025.
//

import FreeroomsAssessment
import Testing

final class FreeroomsBuildingAPITests {
    private var clientTracker: MemoryLeakTracker<MockHttpClient>?
    private var sutTracker: MemoryLeakTracker<BuildingLoader>?
    
    deinit {
        clientTracker?.verifyDeallocation()
        sutTracker?.verifyDeallocation()
    }
    
    /// Ensures that no network calls are made when the `BuildingLoader` is first created.
    @Test("Initialised building loader does not request data")
    func initialisedBuildingLoaderDoesntRequestData() async {
        let (client, _) = makeSut()
        
        #expect(client.networkCallCount == 0)
    }
    
    /// Simulates a network failure from the HttpClient and verifies that the loader returns a connectivity error.
    @Test("Building loader throws error on network failure")
    func buildingLoaderThrowsErrorOnNetworkFailure() async {
        let (client, sut) = makeSut()
        client.setNextRequestToFailWithClientError()
        
        switch await sut.fetchBuildings() {
        case let .success(response):
            Issue.record("Expected an error but got \(response)")
        case let .failure(error):
            #expect(error as? BuildingLoader.Error == BuildingLoader.Error.connectivity)
        }
        #expect(client.networkCallCount == 1)
    }
    
    /// Tests if the loader correctly handles unexpected or malformed data.
    @Test("Building loader throws error on invalid data returned from network")
    func buildingLoaderThrowsErrorOnInvalidData() async {
        let (client, sut) = makeSut()
        client.setNextRequestToSucceedWithReturnedData(try! JSONEncoder().encode(1))
        
        switch await sut.fetchBuildings() {
        case let .success(response):
            Issue.record("Expected an error but got \(response)")
        case let .failure(error):
            #expect(error as? BuildingLoader.Error == BuildingLoader.Error.invalidData)
        }
        #expect(client.networkCallCount == 1)
    }
    
    /// Ensures that HTTP status codes outside `200` (e.g., 199, 201, 300, 400, 500) trigger an error.
    @Test("Building loader throws error on non 200 HTTP response", arguments: [199, 201, 300, 400, 500])
    func buildingLoaderThrowsErrorOnNon200HttpResponse(statusCode code: Int) async {
        let (client, sut) = makeSut()
        client.setNextRequestToSucceedWithStatusCode(code)
        
        switch await sut.fetchBuildings() {
        case let .success(response):
            Issue.record("Expected an error but got \(response)")
        case let .failure(error):
            #expect(error as? BuildingLoader.Error == BuildingLoader.Error.invalidData)
        }
        #expect(client.networkCallCount == 1)
    }
//    
//    /// Ensures that an empty response from the API correctly results in an empty list.
//    @Test("Building loader returns empty list of buildings")
//    func buildingLoaderReturnsEmptyListOfBuildings() async {
//        let (client, sut) = makeSut()
//        client.setNextRequestToSucceedWithReturnedData([RemoteBuilding]().data)
//        
//        var receivedBuildings: [Building]?
//        switch await sut.fetchBuildings() {
//        case let .success(fetchedBuildings):
//            receivedBuildings = fetchedBuildings
//        case let .failure(error):
//            Issue.record("Expected a list of empty buildings but got \(error)")
//        }
//        
//        #expect(receivedBuildings?.isEmpty == true)
//        #expect(client.networkCallCount == 1)
//    }
//    
//    /// Verifies that valid building data is correctly returned and  decoded from the API.
//    @Test("Building loader returns list of buildings")
//    func buildingLoaderReturnsListOfBuildings() async {
//        let (client, sut) = makeSut()
//        let expectedBuildings = makeUniqueBuildings()
//        client.setNextRequestToSucceedWithReturnedData(expectedBuildings.toRemoteBuildings.data)
//        
//        var receivedBuildings: [Building]?
//        switch await sut.fetchBuildings() {
//        case let .success(fetchedBuildings):
//            receivedBuildings = fetchedBuildings
//        case let .failure(error):
//            Issue.record("Expected \(expectedBuildings) but got \(error)")
//        }
//        
//        #expect(receivedBuildings == expectedBuildings)
//        #expect(client.networkCallCount == 1)
//    }
//    
//    /// Ensures that consecutive fetch requests return updated results instead of cached data.
//    @Test("Building loader fetch requests return different lists of buildings")
//    func buildingLoaderFetchRequestDoesNotCache() async {
//        let (client, sut) = makeSut()
//        var expectedBuildings = makeUniqueBuildings()
//        client.setNextRequestToSucceedWithReturnedData(expectedBuildings.toRemoteBuildings.data)
//        
//        var receivedBuildings: [Building]?
//        switch await sut.fetchBuildings() {
//        case let .success(fetchedBuildings):
//            receivedBuildings = fetchedBuildings
//        case let .failure(error):
//            Issue.record("Expected \(expectedBuildings) but got \(error)")
//        }
//        
//        #expect(receivedBuildings == expectedBuildings)
//        #expect(client.networkCallCount == 1)
//        
//        expectedBuildings = makeUniqueBuildings()
//        client.setNextRequestToSucceedWithReturnedData(expectedBuildings.toRemoteBuildings.data)
//        
//        switch await sut.fetchBuildings() {
//        case let .success(fetchedBuildings):
//            receivedBuildings = fetchedBuildings
//        case let .failure(error):
//            Issue.record("Expected \(expectedBuildings) but got \(error)")
//        }
//        
//        #expect(receivedBuildings == expectedBuildings)
//        #expect(client.networkCallCount == 2)
//    }
//    
    
    
    private func makeSut(sourceLocation: SourceLocation = #_sourceLocation) -> (client: MockHttpClient, sut: BuildingLoader) {
        let client = MockHttpClient()
        let sut = BuildingLoader(client: client, url: URL(string: "https://a-url.com")!)
        clientTracker = MemoryLeakTracker(instance: client, sourceLocation: sourceLocation)
        sutTracker = MemoryLeakTracker(instance: sut, sourceLocation: sourceLocation)
        return (client, sut)
    }
    
    private func makeUniqueBuildings() -> [Building] {
        return [
            Building(name: "a", id: UUID().uuidString, latitude: 0, longitude: 0, aliases: []),
            Building(name: "b", id: UUID().uuidString, latitude: 0, longitude: 0, aliases: []),
            Building(name: "c", id: UUID().uuidString, latitude: 0, longitude: 0, aliases: [])
        ]
    }
    
    /// Simulates network responses.
    private class MockHttpClient: HttpClient {
        var networkCallCount = 0
        var returnedRemoteBuildingsData: Data?
        var returnedStatusCode: Int!
        
        public enum Error: Swift.Error {
            case networkFailure
        }
        
        func setNextRequestToFailWithClientError() {
            returnedRemoteBuildingsData = nil
        }
        
        func setNextRequestToSucceedWithStatusCode(_ statusCode: Int) {
            returnedRemoteBuildingsData = [RemoteBuilding]().data
            returnedStatusCode = statusCode
        }
        
        func setNextRequestToSucceedWithReturnedData(_ data: Data) {
            returnedRemoteBuildingsData = data
            returnedStatusCode = 200
        }
        
        func get(from url: URL) async -> HttpClient.Result {
            networkCallCount += 1
            
            if let returnedRemoteBuildingsData {
                return Result.success((returnedRemoteBuildingsData, HTTPURLResponse(url: url, statusCode: returnedStatusCode, httpVersion: nil, headerFields: nil)!))
            } else {
                return .failure(Error.networkFailure)
            }
        }
    }
}

private extension Array where Element == Building {
    var toRemoteBuildings: [RemoteBuilding] {
        self.map { RemoteBuilding(building_name: $0.name, building_id: UUID(uuidString: $0.id)!, building_latitude: $0.latitude, building_longitude: $0.longitude, building_aliases: $0.aliases) }
    }
}

private extension Array where Element == RemoteBuilding {
    var data: Data {
        (try? JSONEncoder().encode(self))!
    }
}


