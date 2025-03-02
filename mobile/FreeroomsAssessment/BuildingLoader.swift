//
//  BuildingLoader.swift
//  FreeroomsAssessment
//
//  Created by Anh Nguyen on 31/1/2025.
//

import Foundation

public class BuildingLoader {
    private var client: HttpClient
    private var url: URL
    
    public enum Error: Swift.Error {
        case connectivity, invalidData
    }
    
    public typealias Result = Swift.Result<[Building], Swift.Error>
    
    public init(client: HttpClient, url: URL) {
        self.client = client
        self.url = url
    }
    
    public func fetchBuildings() async -> Result {
        let response = await client.get(from: url)
        
        switch response {
        case .failure:
            return .failure(Error.connectivity)
            
        case let .success((data, httpResponse)):
            if httpResponse.statusCode != 200 {
                return .failure(Error.invalidData)
            }
            // make an array of remote building objects
            if let _ = try? JSONDecoder().decode([RemoteBuilding].self, from: data) {
                // empty buildings
                return .success([])
            } else {
                // assumes json is currupt
                return .failure(Error.invalidData)
            }
        }
    }
}
