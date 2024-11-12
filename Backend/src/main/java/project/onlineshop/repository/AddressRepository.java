package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
