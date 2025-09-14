package com.hyperlocal.marketplace.repository;

import com.hyperlocal.marketplace.entity.ProviderProfile;
import com.hyperlocal.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    Optional<ProviderProfile> findByUser(User user);
}
