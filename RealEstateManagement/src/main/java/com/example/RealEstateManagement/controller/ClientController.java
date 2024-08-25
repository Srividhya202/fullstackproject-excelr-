package com.example.RealEstateManagement.controller;


import com.example.RealEstateManagement.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.RealEstateManagement.exception.ResourceNotFoundException;
import com.example.RealEstateManagement.model.Client;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins="http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/all")
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @PostMapping("/add")
    public Client addClient(@RequestBody Client client) {
        return clientRepository.save(client);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client clientDetails) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found for this id :: " + id));

        client.setName(clientDetails.getName());
        client.setEmail(clientDetails.getEmail());
        client.setMobile(clientDetails.getMobile());

        final Client updatedClient = clientRepository.save(client);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found for this id :: " + id));

        clientRepository.delete(client);
        return ResponseEntity.noContent().build();
    }
}

